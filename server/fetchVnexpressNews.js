import { launchBrowser, createOptimizedPage , fetchArticlesFromPage } from './puppeteerService.js'

export const fetchVnexpressNews = async () => {
    const browser = await launchBrowser()
    const page = await createOptimizedPage(browser)
    const articles = await fetchArticlesFromPage(page, 'https://vnexpress.net/', '.title-news a')

    await browser.close()

    return articles
}
