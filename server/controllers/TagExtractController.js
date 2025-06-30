export const postExtractATag = async (req, res) => {
    const { tagExtractService } = req.container.cradle
    const { url } = req.body

    try {
        const tags = await tagExtractService.getAllATag(url)
        res.json(tags)
    } catch (error) {
        console.log('Lỗi khi lấy thông tin thẻ:', error)
        res.json({ error: 'Không thể lấy thông tin thẻ' })
    }
}
