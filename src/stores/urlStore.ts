import { defineStore } from 'pinia'
import axios from 'axios'
import type { UrlItem } from '@/types/urlItem'

export const useUrlStore = defineStore('urlStore', {
    state: () => ({
        urls: [] as UrlItem[],
    }),
    actions: {
        async addUrl(url: string) {
            const id = Date.now()
            this.urls.push({ id, url, status: 'pending', data: null, error: null })

            try {
                const response = await axios.post('http://localhost:3000/api/extract-head', { url })
                const index = this.urls.findIndex((item) => item.id === id)

                if (index !== -1) {
                    this.urls[index].status = 'success'
                    this.urls[index].data = response.data
                }
            } catch (error) {
                const index = this.urls.findIndex((item) => item.id === id)

                if (index !== -1) {
                    this.urls[index].status = 'error'
                    this.urls[index].error =
                        error.response?.data?.message || error.message || String(error)
                }
            }
        },
    },
})
