import { createContainer, asClass } from 'awilix'
import { NewsService } from '../services/NewsService.js'
import { HeadInfoService } from '../services/HeadInfoService.js'
import { PuppeteerService } from '../services/PuppeteerService.js'
import { TagExtractService } from '../services/TagExtractService.js'


const container = createContainer()

container.register({
    newsService: asClass(NewsService).singleton(),
    headInfoService: asClass(HeadInfoService).singleton(),
    puppeteerService: asClass(PuppeteerService).singleton(),
    tagExtractService: asClass(TagExtractService).singleton(),
})

const puppeteerService = container.resolve('puppeteerService')
puppeteerService.launchBrowser().then(() => console.log('Đã khởi động browser'))

export default container
