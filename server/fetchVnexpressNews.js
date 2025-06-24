import { launch } from 'puppeteer'

export const fetchNews = async () => {
    const startTime = Date.now()
    console.log(`Fetching started at ${new Date(startTime).toISOString()}`)

    const browser = await launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
            req.abort()
        } else {
            req.continue()
        }
    })

    await page.goto('https://vnexpress.net/', { waitUntil: 'domcontentloaded' })

    const articles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.title-news a')).map((el) => ({
            title: el.innerText.trim(),
            url: el.href,
        }))
    })

    await browser.close()

    const endTime = Date.now()
    console.log(`Fetching finished at ${new Date(endTime).toISOString()}`)
    console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`)

    return articles
}
