import express from 'express'
import apiRouter from './api/index.js'
import { scopePerRequest } from 'awilix-express'
import container from '../configs/container.js'

const router = express.Router()
router.use(scopePerRequest(container))
router.use('/api', apiRouter)

export default router
