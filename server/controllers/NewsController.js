export const getNews = async (req, res) => {
    const { newsService } = req.container.cradle

    try {
        const news = await newsService.fetchVnexpressNews()
        res.json(news)
    } catch (error) {
        console.error('Lỗi khi lấy tin tức:', error)
        res.status(500).json({ error: 'Không thể lấy tin tức' })
    }
}

export const getMultipleNews = async (req, res) => {
    const { newsService } = req.container.cradle

    try {
        const news = await newsService.fetchMultipleNews()
        res.json(news)
    } catch (error) {
        console.error('Lỗi khi lấy tin tức:', error)
        res.status(500).json({ error: 'Không thể lấy tin tức' })
    }
}
