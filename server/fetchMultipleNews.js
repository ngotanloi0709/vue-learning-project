import { launchBrowser, createOptimizedPage, fetchArticlesFromPage } from './puppeteerService.js'

const fetchFromSite = async (browser, url, selector) => {
    // try {
    const page = await createOptimizedPage(browser)
    const articles = await fetchArticlesFromPage(page, url, selector)
    await page.close()

    return { articles, error: null }
    // } catch (error) {
    //     console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, error.message)

    //     return { articles: [], error: error.message }
    // }
}

export const fetchMultipleNews = async () => {
    const browser = await launchBrowser()

    const sources = [
        { url: 'https://soha/', selector: '.box-category-content h3 a' },
        { url: 'https://vnexpress.net/', selector: '.title-news a' },
        { url: 'https://dantri.com.vn/', selector: '.article-title a' },
        { url: 'https://baomoi.com', selector: '.bm-section h3 a' },
        { url: 'https://zingnews.vn/', selector: '.article-title a' },
    ]

    // const results = await Promise.all(
    //     sources.map((source) => fetchFromSite(browser, source.url, source.selector)),
    // )

    // Cách khác để không bị crash ngoài try catch
    const results = await Promise.allSettled(
        sources.map((source) => fetchFromSite(browser, source.url, source.selector)),
    )

    const normalizedResults = results.map((result) => {
        if (result.status === 'fulfilled') {
            return result.value
        } else {
            return { articles: [], error: result.reason?.message || String(result.reason) }
        }
    })

    await browser.close()

    return normalizedResults.map((result, index) => ({
        url: sources[index].url,
        articles: result.articles,
        error: result.error,
    }))
}
