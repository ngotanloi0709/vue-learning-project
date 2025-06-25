import { launchBrowser, createOptimizedPage } from './puppeteerService.js'

export const fetchHeadInfo = async (url) => {
    const browser = await launchBrowser()
    const page = await createOptimizedPage(browser)

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

        const headInfo = await page.evaluate(() => {
            const metaTags = Array.from(document.querySelectorAll('head meta')).map((meta) => ({
                name: meta.getAttribute('name'),
                content: meta.getAttribute('content'),
            }))
            const title = document.querySelector('head title')?.innerText || null
            const links = Array.from(document.querySelectorAll('head link')).map((link) => ({
                rel: link.getAttribute('rel'),
                href: link.getAttribute('href'),
            }))

            return { title, metaTags, links }
        })

        return headInfo
    } finally {
        await browser.close()
    }
}
