import { createOptimizedPage } from './puppeteerService.js'

export const fetchHeadInfo = async (url, browser) => {
    const page = await createOptimizedPage(browser)

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })

        const headInfo = await page.evaluate(() => {
            // const metaTags = Array.from(document.querySelectorAll('head meta')).map((meta) => ({
            //     name: meta.getAttribute('name'),
            //     content: meta.getAttribute('content'),
            // }))
            const title = document.querySelector('head title')?.innerText || null
            // const links = Array.from(document.querySelectorAll('head link')).map((link) => ({
            //     rel: link.getAttribute('rel'),
            //     href: link.getAttribute('href'),
            // }))

            // return { title, metaTags, links }
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
