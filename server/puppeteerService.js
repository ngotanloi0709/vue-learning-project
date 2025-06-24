import puppeteer from 'puppeteer'
import chromium from '@sparticuz/chromium-min'
import puppeteerCore from 'puppeteer-core'
import { getLocalDateTimeString } from './utils.js'

const remoteExecutablePath =
    'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'

export const launchBrowser = async (isProduction) => {
    if (isProduction) {
        return puppeteerCore.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(remoteExecutablePath),
            headless: true,
        })
    } else {
        return puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
    }
}

export const createOptimizedPage = async (browser) => {
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media', 'script'].includes(req.resourceType())) {
            req.abort()
        } else {
            req.continue()
        }
    })

    return page
}

export const fetchArticlesFromPage = async (page, url, selector) => {
    const startTime = Date.now()
    console.log(`Bắt đầu lấy bài báo từ ${url} lúc ${getLocalDateTimeString(startTime)}`)

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

    const articles = await page.evaluate((selector) => {
        return Array.from(document.querySelectorAll(selector)).map((el) => ({
            title: el.innerText.trim(),
            url: el.href,
        }))
    }, selector)

    const endTime = Date.now()
    console.log(`Kết thúc lấy bài báo từ ${url} lúc ${getLocalDateTimeString(endTime)}\n
    Thời gian lấy bài báo: ${(endTime - startTime) / 1000} giây`)

    return articles
}
