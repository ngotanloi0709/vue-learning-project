export class HeadInfoService {
    constructor({ puppeteerService }) {
        this.puppeteerService = puppeteerService
    }

    async getPageTitle(url) {
        const page = await this.puppeteerService.createOptimizedPage()
        const redirectHistory = [url]

        try {
            page.on('response', (response) => {
                const request = response.request()
                if (request.redirectChain().length > 0) {
                    const lastRedirect = request.redirectChain().at(-1)

                    if (lastRedirect) {
                        const redirectedUrl = lastRedirect.url()
                        if (!redirectHistory.includes(redirectedUrl)) {
                            redirectHistory.push(redirectedUrl)
                        }
                    }
                }
            })

            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })

            const headInfo = await page.evaluate(() => {
                const title = document.querySelector('head title')?.innerText || null
                return { title }
            })

            return { ...headInfo, redirectHistory }
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin đầu trang từ ${url}:`, error)
            throw new Error(`Không thể lấy thông tin đầu trang từ ${url}: ${error.message}`)
        } finally {
            await page.close()
        }
    }
}
