export const getLocalDateTimeString = () => {
    const m = new Date()
    return (
        m.getFullYear() +
        '/' +
        ('0' + (m.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + m.getDate()).slice(-2) +
        ' ' +
        ('0' + m.getHours()).slice(-2) +
        ':' +
        ('0' + m.getMinutes()).slice(-2) +
        ':' +
        ('0' + m.getSeconds()).slice(-2)
    )
}

export const isValidUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch (error) {
        console.error('URL không hợp lệ:', url, ' lỗi:', error.message)
        return false
    }
}
