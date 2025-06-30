import { defineStore } from 'pinia'
import axios from 'axios'

export const useTagStore = defineStore(' tagStore', {
    state: () => ({
        tags: [] as ATag[],
        loading: false,
    }),
    actions: {
        async fetchTags(url: string) {
            try {
                this.loading = true

                const response = await axios.post('http://localhost:3000/api/get-all-a-tag', { url })

                this.tags = response.data
            } catch (error) {
                console.error('Lỗi:', error)
            } finally {
                this.loading = false
            }
        },
    },
})
