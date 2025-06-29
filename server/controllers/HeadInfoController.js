import { isValidUrl } from '../utils.js'
import PQueue from 'p-queue'

export const postExtractHead = async (req, res) => {
    const { headInfoService } = req.container.cradle

    const { url } = req.body

    if (isValidUrl(url)) {
        try {
            const result = await headInfoService.getPageTitle(url)
            res.json(result)
        } catch (error) {
            console.error('Lỗi khi lấy thông tin:', error)
            res.status(500).json({ error: `Không thể lấy thông tin: ${error.message}` })
        }
    } else {
        return res.status(500).json({ error: `URL không hợp lệ` })
    }
}

export const postExtractHeadBatch = async (req, res) => {
    const { headInfoService } = req.container.cradle
    const { urls } = req.body

    if (!Array.isArray(urls) || urls.some((urlItem) => !isValidUrl(urlItem.url))) {
        return res.status(400).json({ error: 'Danh sách URL không hợp lệ' })
    }

    const queue = new PQueue({ concurrency: 5 })

    const results = []
    let batchResults = []

    try {
        await Promise.all(
            urls.map((item, index) =>
                queue.add(async () => {
                    console.log(`Đang xử lý URL ${index + 1}/${urls.length}: ${item.url} bắt đầu lúc ${new Date().toLocaleTimeString()}`)

                    try {
                        const headInfo = await headInfoService.getPageTitle(item.url)
                        results.push({
                            id: item.id,
                            url: item.url,
                            status: 'success',
                            data: headInfo,
                            error: null,
                        })
                    } catch (error) {
                        results.push({
                            id: item.id,
                            url: item.url,
                            status: 'error',
                            data: null,
                            error: error.message,
                        })
                    }
                    console.log(`Đã xử lý URL ${index + 1}/${urls.length}: ${item.url} và hoàn thành lúc ${new Date().toLocaleTimeString()}`)

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

        res.end()
    } catch (error) {
        console.error('Lỗi khi xử lý URL:', error)
        res.status(500).json({ error: 'Lỗi khi xử lý URL' })
    }
}
