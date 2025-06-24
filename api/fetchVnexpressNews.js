import chromium from '@sparticuz/chromium-min'
import puppeteerCore from 'puppeteer-core'

export const dynamic = 'force-dynamic'
const remoteExecutablePath =
    'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const browser = await puppeteerCore.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(remoteExecutablePath),
            headless: true,
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

        await page.goto('https://vnexpress.net/', { waitUntil: 'domcontentloaded', timeout: 60000 })

        const articles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.title-news a')).map((el) => ({
                title: el.innerText.trim(),
                url: el.href,
            }))
        })

        await browser.close()

        return res.status(200).json(articles)
    } catch (error) {
        console.error('Error fetching news:', error)
        return res.status(500).json({ error: 'Failed to fetch news', message: error.message })
    }
}
