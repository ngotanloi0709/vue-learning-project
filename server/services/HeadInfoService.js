export class HeadInfoService {
    constructor({ puppeteerService }) {
        this.puppeteerService = puppeteerService
    }

    async getPageTitle(url) {
        const page = await this.puppeteerService.createOptimizedPage()

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })

            const headInfo = await page.evaluate(() => {
                const title = document.querySelector('head title')?.innerText || null
                return { title }
            })

            return headInfo
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin đầu trang từ ${url}:`, error)
            throw new Error(`Không thể lấy thông tin đầu trang từ ${url}: ${error.message}`)
        } finally {
            await page.close()
        }
    }
}
