import express from 'express'
import cors from 'cors'
import { fetchVnexpressNews } from './fetchVnexpressNews.js'
import { fetchMultipleNews } from './fetchMultipleNews.js'

const app = express()
app.use(cors())

app.get('/api/news', async (req, res) => {
    try {
        const articles = await fetchVnexpressNews()
        res.json(articles)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Không thể lấy tin tức' })
    }
})

app.get('/api/multiple-news', async (req, res) => {
    try {
        const results = await fetchMultipleNews()
        res.json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Không thể lấy tin tức từ nhiều nguồn' })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
