import express from 'express'
import cors from 'cors'
import router from './routes/index.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// Khởi tạo Puppeteer browser

// app.get('/api/news', async (req, res) => {

// })

// app.get('/api/multiple-news', async (req, res) => {

// })

// app.post('/api/extract-head', async (req, res) => {

// })

// const queue = new PQueue({ concurrency: 5 })
// app.post('/api/extract-head-batch', async (req, res) => {

// })

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
