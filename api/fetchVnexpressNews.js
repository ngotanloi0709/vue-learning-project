import { launchBrowser, createOptimizedPage, fetchArticlesFromPage } from '../server/puppeteerService.js'

export default async function handler(req, res) {
    try {
        const browser = await launchBrowser(true)
        const page = await createOptimizedPage(browser)
        const articles = await fetchArticlesFromPage(page, 'https://vnexpress.net/', '.title-news a')

        await browser.close()

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        return res.status(200).json(articles)
    } catch (error) {
        console.error('Error fetching news:', error)
        return res.status(500).json({ error: 'Failed to fetch news', message: error.message })
    }
}
