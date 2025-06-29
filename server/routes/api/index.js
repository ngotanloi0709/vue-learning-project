import express from 'express'
import { getNews, getMultipleNews } from '../../controllers/NewsController.js'
import { postExtractHead, postExtractHeadBatch } from '../../controllers/HeadInfoController.js'

const apiRouter = express.Router()

apiRouter.get('/news', getNews)
apiRouter.get('/multiple-news', getMultipleNews)
apiRouter.post('/extract-head', postExtractHead)
apiRouter.post('/extract-head-batch', postExtractHeadBatch)

export default apiRouter
