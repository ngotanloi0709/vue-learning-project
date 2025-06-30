import { isValidUrl } from '../utils.js'

export class TagExtractService {
    constructor({ puppeteerService }) {
        this.puppeteerService = puppeteerService
    }

    async getAllATag(url) {
        if (!isValidUrl(url)) {
            throw new Error('URL không hợp lệ')
        }

        const page = await this.puppeteerService.createOptimizedPage()

        try {
            console.log(`Đang truy cập URL: ${url}`)
            // networkidle2 để không có yêu cầu mới trong 500ms
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

            // Chờ cho thẻ a cần tìm xuất hiện
            await page.waitForSelector('a', { timeout: 10000 })

            // Trích xuất thẻ a
            const links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a')).map((a) => ({
                    href: a.href,
                    text: a.innerText.trim(),
                }))
            })

            console.log(`Đã lấy được ${links.length} thẻ <a> từ URL: ${url}`)
            return links
        } catch (error) {
            console.error(`Lỗi khi lấy thẻ <a> từ URL ${url}:`, error)
            throw new Error(`Không thể lấy thẻ <a> từ URL: ${error.message}`)
        } finally {
            await page.close()
        }
    }
}
