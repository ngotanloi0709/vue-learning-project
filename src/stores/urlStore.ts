import { defineStore } from 'pinia'
import axios from 'axios'
import type { UrlItem } from '@/types/urlItem'

export const useUrlStore = defineStore('urlStore', {
    state: () => ({
        urls: [] as UrlItem[],
        pendingStartTime: 0,
        pendingEndTime: 0,
    }),
    actions: {
        async fetchUrlHead(url: string, id: number) {
            const index = this.urls.findIndex((item) => item.id === id)

            try {
                const response = await axios.post('http://localhost:3000/api/extract-head', { url })

                this.updateUrlItem(index, {
                    status: 'success',
                    data: response.data,
                    error: null,
                })
            } catch (error) {
                this.updateUrlItem(index, {
                    status: 'error',
                    data: null,
                    error: error?.response?.data?.error || 'Lỗi không xác định',
                })
            } finally {
                this.checkPendingList()
            }
        },
        async fetchMultipleUrls(urls: { id: number; url: string }[]) {
            try {
                const response = await fetch('http://localhost:3000/api/extract-head-batch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ urls }),
                })

                const reader = response.body.getReader()
                const decoder = new TextDecoder('utf-8')

                let done = false
                while (!done) {
                    const { value, done: streamDone } = await reader.read()
                    done = streamDone

                    if (value) {
                        const chunk = decoder.decode(value)
                        const batchResults = JSON.parse(chunk.trim())

                        batchResults.forEach((result: UrlItem) => {
                            const index = this.urls.findIndex((item) => item.id === result.id)
                            if (index !== -1) {
                                this.updateUrlItem(index, {
                                    status: result.status,
                                    data: result.data,
                                    error: result.error,
                                })
                            }
                        })
                    }
                }
            } catch (error) {
                console.error('Lỗi khi xử lý danh sách URL:', error)
            } finally {
                this.checkPendingList()
            }
        },
        updateUrlItem(index: number, updates: Partial<UrlItem>) {
            if (index !== -1) {
                this.urls[index] = { ...this.urls[index], ...updates }
            }
        },
        addUrl(url: string) {
            const id = Date.now() + Math.random()
            this.urls.push({
                id: id,
                url: url,
                status: 'pending',
                data: null,
                error: null,
            })

            if (this.urls.filter((item) => item.status === 'pending').length === 1) {
                this.pendingStartTime = performance.now()
            }

            return id
        },
        pushSingleUrl(url: string) {
            const id = this.addUrl(url)
            this.fetchUrlHead(url, id)
        },
        pushMultipleUrls(urls: string[]) {
            const fetchInput: { id: number; url: string }[] = []

            urls.forEach((url) => {
                const urlId = this.addUrl(url)
                fetchInput.push({ id: urlId, url: url })
            })

            this.fetchMultipleUrls(fetchInput)
        },
        checkPendingList() {
            if (this.urls.filter((item) => item.status === 'pending').length === 0) {
                this.pendingEndTime = performance.now()
                const duration = (this.pendingEndTime - this.pendingStartTime).toFixed(2)
                console.log(`Thời gian xử lý: ${duration} ms`)
            }
        },
    },
})
