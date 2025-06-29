import { getLocalDateTimeString } from '../utils.js'
export class NewsService {
    constructor({ puppeteerService }) {
        this.puppeteerService = puppeteerService
    }

    async fetchVnexpressNews() {
        const page = await this.puppeteerService.createOptimizedPage()
        const articles = await this.fetchArticlesFromPage(
            page,
            'https://vnexpress.net/',
            '.title-news a',
        )

        return articles
    }

    async fetchArticlesFromPage(page, url, selector) {
        const startTime = Date.now()
        console.log(`Bắt đầu lấy bài báo từ ${url} lúc ${getLocalDateTimeString(startTime)}`)

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })

        const articles = await page.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector))
                .slice(0, 10)
                .map((el) => ({
                    title: el.innerText.trim(),
                    url: el.href,
                }))
        }, selector)

        const endTime = Date.now()
        console.log(`Kết thúc lấy bài báo từ ${url} lúc ${getLocalDateTimeString(endTime)}\n
        Thời gian lấy bài báo: ${(endTime - startTime) / 1000} giây`)

        await page.close()
        return articles
    }

    async fetchMultipleNews() {
        const sources = [
            { url: 'https://soha/', selector: '.box-category-content h3 a' },
            { url: 'https://vnexpress.net/', selector: '.title-news a' },
            { url: 'https://dantri.com.vn/', selector: '.article-title a' },
            { url: 'https://baomoi.com', selector: '.bm-section h3 a' },
            { url: 'https://zingnews.vn/', selector: '.article-title a' },
        ]

        const results = await Promise.allSettled(
            sources.map((source) => this.fetchFromSite(source.url, source.selector)),
        )

        const normalizedResults = results.map((result) => {
            if (result.status === 'fulfilled') {
                return result.value
            } else {
                return { articles: [], error: result.reason?.message || String(result.reason) }
            }
        })

        return normalizedResults.map((result, index) => ({
            url: sources[index].url,
            articles: result.articles,
            error: result.error,
        }))
    }

    async fetchFromSite(url, selector) {
        const page = await this.puppeteerService.createOptimizedPage()
        const articles = await this.fetchArticlesFromPage(page, url, selector)
        return { articles, error: null }
    }
}
