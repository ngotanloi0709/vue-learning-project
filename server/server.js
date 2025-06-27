import express from 'express'
import cors from 'cors'
import { fetchVnexpressNews } from './fetchVnexpressNews.js'
import { fetchMultipleNews } from './fetchMultipleNews.js'
import { fetchHeadInfo } from './fetchHeadInfo.js'
import { isValidUrl } from './utils.js'
import PQueue from 'p-queue'
import { launchBrowser } from './puppeteerService.js'
const app = express()
app.use(cors())
app.use(express.json())

// Khởi tạo Puppeteer browser
const browser = await launchBrowser()

app.get('/api/news', async (req, res) => {
    try {
        const articles = await fetchVnexpressNews()
        res.json(articles)
    } catch (error) {
        console.error('Lỗi:', error)
        res.status(500).json({
            error: 'Không thể lấy tin tức từ VnExpress',
            message: error.message,
        })
    }
})

app.get('/api/multiple-news', async (req, res) => {
    try {
        const results = await fetchMultipleNews()
        res.json(results)
    } catch (error) {
        console.error('Lỗi:', error)
        res.status(500).json({
            error: 'Không thể lấy tin tức từ nhiều nguồn',
            message: error.message,
        })
    }
})

app.post('/api/extract-head', async (req, res) => {
    const { url } = req.body

    if (!isValidUrl(url)) {
        return res.status(500).json({ error: 'URL không hợp lệ' })
    }

    try {
        const headInfo = await fetchHeadInfo(url, browser)
        res.json(headInfo)
    } catch (error) {
        console.error('Lỗi:', error)
        res.status(500).json({ error: error.message })
    }
})

const queue = new PQueue({ concurrency: 5 })
app.post('/api/extract-head-batch', async (req, res) => {
    const { urls } = req.body
    console.log(req.body)
    if (!Array.isArray(urls) || urls.some((urlItem) => !isValidUrl(urlItem.url))) {
        return res.status(400).json({ error: 'Danh sách URL không hợp lệ' })
    }

    const results = []
    let batchResults = []

    try {
        await Promise.all(
            urls.map((item, index) =>
                queue.add(async () => {
                    console.log(
                        `Đang xử lý URL ${index + 1}/${urls.length}: ${item.url} bắt đầu lúc ${new Date().toLocaleTimeString()}`,
                    )

                    try {
                        const headInfo = await fetchHeadInfo(item.url, browser)
                        results.push({ id: item.id, url: item.url, status: 'success', data: headInfo, error: null })
                    } catch (error) {
                        results.push({ id: item.id, url: item.url, status: 'error', data: null, error: error.message })
                    }
                    console.log(
                        `Đã xử lý URL ${index + 1}/${urls.length}: ${item.url} và hoàn thành lúc ${new Date().toLocaleTimeString()}`,
                    )

                    if (results.length % 5 === 0) {
                      batchResults = results.slice(-5)
                      res.write(JSON.stringify(batchResults) + '\n')
                      batchResults = []
                      console.log(`Đã gửi ${results.length} kết quả đến client`)
                    }
                }),
            ),
        )

        const remainingResults = results.length % 5
        if (remainingResults > 0) {
            batchResults = results.slice(-remainingResults)
            res.write(JSON.stringify(batchResults) + '\n')
            console.log(`Đã gửi nhóm cuối cùng gồm ${remainingResults} kết quả đến client`)
        }

        // Kết thúc stream
        res.end()
    } catch (error) {
        console.error('Lỗi khi xử lý URL:', error)
        res.status(500).json({ error: 'Lỗi khi xử lý URL' })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
