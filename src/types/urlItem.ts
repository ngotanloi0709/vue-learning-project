export type UrlItem = {
    id: number
    url: string
    status: 'pending' | 'success' | 'error'
    data: null | {
        title: string | null
        metaTags: { name: string | null; content: string | null }[]
        links: { rel: string | null; href: string | null }[]
        redirectHistory?: string[]
    }
    error: string | null
}
