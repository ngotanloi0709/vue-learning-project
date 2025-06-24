import { launch } from 'puppeteer'

const fetchFromSite = async (browser, url, selector) => {
    const startTime = Date.now()
    console.log(`Fetching from ${url} started at ${new Date(startTime).toISOString()}`)

    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media', 'script'].includes(req.resourceType())) {
            req.abort()
        } else {
            req.continue()
        }
    })

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

    const articles = await page.evaluate((selector) => {
        return Array.from(document.querySelectorAll(selector))
            .slice(0, 10)
            .map((el) => ({
                title: el.innerText.trim(),
                url: el.href,
            }))
    }, selector)

    await page.close()

    const endTime = Date.now()
    console.log(`Fetching from ${url} finished at ${new Date(endTime).toISOString()}`)
    console.log(`Time taken for ${url}: ${(endTime - startTime) / 1000} seconds`)

    return articles
}

export const fetchMultipleNews = async () => {
    const browser = await launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const sources = [
        { url: 'https://vnexpress.net/', selector: '.title-news a' },
        { url: 'https://dantri.com.vn/', selector: '.article-title a' },
        { url: 'https://baomoi.com', selector: '.bm-section h3 a'},
        { url: 'https://zingnews.vn/', selector: '.article-title a' },
        { url: 'https://soha.vn', selector: '.box-category-content h3 a' },
    ]

    const results = await Promise.all(
        sources.map((source) => fetchFromSite(browser, source.url, source.selector)),
    )

    await browser.close()

    return results.map((articles, index) => ({
        source: sources[index].url,
        articles,
    }))
}
