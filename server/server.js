import express from 'express'
import cors from 'cors'
import { fetchVnexpressNews } from './fetchVnexpressNews.js'
import { fetchMultipleNews } from './fetchMultipleNews.js'
import { fetchHeadInfo } from './fetchHeadInfo.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/news', async (req, res) => {
    try {
        const articles = await fetchVnexpressNews()
        res.json(articles)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Không thể lấy tin tức' })
    }
})

app.get('/api/multiple-news', async (req, res) => {
    try {
        const results = await fetchMultipleNews()
        res.json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Không thể lấy tin tức từ nhiều nguồn' })
    }
})

app.post('/api/extract-head', async (req, res) => {
    const { url } = req.body
    if (!url) {
        return res.status(400).json({ error: 'Thiếu URL' })
    }

    try {
        const headInfo = await fetchHeadInfo(url)
        res.json(headInfo)
    } catch (error) {
        console.error('Error extracting head info:', error)
        res.status(500).json({ error: 'Không thể lấy thông tin head', message: error.message })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
