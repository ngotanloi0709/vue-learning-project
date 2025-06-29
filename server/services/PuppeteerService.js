import puppeteer from 'puppeteer'
import chromium from '@sparticuz/chromium-min'
import puppeteerCore from 'puppeteer-core'

const remoteExecutablePath =
    'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'

export class PuppeteerService {
    constructor() {
        this.browser = null
    }

    async launchBrowser(isProduction = false) {
        if (!this.browser) {
            if (isProduction) {
                await this.launchBrowserInProduction()
            } else {
                await this.launchBrowserInDevelopment()
            }
        }

        return this.browser
    }

    async launchBrowserInProduction() {
        this.browser = await puppeteerCore.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(remoteExecutablePath),
            headless: true,
            ignoreHTTPSErrors: true,
        })
    }

    async launchBrowserInDevelopment() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-http2'],
            ignoreHTTPSErrors: true,
        })
    }

    async createOptimizedPage() {
        if (!this.browser) {
            throw new Error('Browser chưa được khởi tạo. Vui lòng gọi launchBrowser trước.')
        }

        const page = await this.browser.newPage()

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

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close()
            this.browser = null
        }
    }
}
