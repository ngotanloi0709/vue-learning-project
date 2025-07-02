import type { Source } from '@/types/source'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useMultipleNewsStore = defineStore('multipleNews', {
    state: () => ({
        sources: JSON.parse(sessionStorage.getItem('multipleNewsStore:sources') || '[]') as Source[],
        // sources: JSON.parse(localStorage.getItem('multipleNewsStore:sources') || '[]') as Source[],
        loading: false,
    }),
    actions: {
        async fetchSources() {
            this.loading = true

            try {
                const response = await axios.get('http://localhost:3000/api/multiple-news')
                this.sources = response.data
                this.saveToLocalStorage()
            } catch (error) {
                console.error('Lỗi:', error)
            } finally {
                this.loading = false
            }
        },
        saveToLocalStorage() {
            sessionStorage.setItem('multipleNewsStore:sources', JSON.stringify(this.sources))
            // localStorage.setItem('multipleNewsStore:sources', JSON.stringify(this.sources))
        },
    },
})
