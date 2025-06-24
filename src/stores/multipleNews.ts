import type { Source } from '@/types/source'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useMultipleNewsStore = defineStore('multipleNews', {
    state: () => ({
        sources: [] as Source[],
    }),
    actions: {
        async fetchSources() {
            try {
                const response = await axios.get('http://localhost:3000/api/multiple-news')
                this.sources = response.data
            } catch (error) {
                console.error('Lỗi:', error)
            }
        },
    },
})
