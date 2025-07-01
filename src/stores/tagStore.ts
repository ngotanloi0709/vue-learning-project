import { defineStore } from 'pinia'
import axios from 'axios'
import type { ATag } from '@/types/aTag'

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: JSON.parse(localStorage.getItem('tagStore:tags') || '[]') as ATag[], // Khôi phục trạng thái từ localStorage
        loading: false,
    }),
    actions: {
        async fetchTags(url: string) {
            try {
                this.loading = true

                const response = await axios.post('http://localhost:3000/api/get-all-a-tag', { url })

                this.tags = response.data
                this.saveToLocalStorage() // Lưu trạng thái vào localStorage
            } catch (error) {
                console.error('Lỗi:', error)
            } finally {
                this.loading = false
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('tagStore:tags', JSON.stringify(this.tags)) // Lưu trạng thái vào localStorage
        },
    },
})
