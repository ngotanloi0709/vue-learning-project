import type { Article } from '@/types/article'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewsStore = defineStore('news', {
    state: () => ({
        articles: JSON.parse(localStorage.getItem('newsStore:articles') || '[]') as Article[],
        loading: false,
    }),
    actions: {
        async fetchNews() {
            this.loading = true

            try {
                const response = await axios.get('http://localhost:3000/api/news')
                // const response = await axios.get('https://vue-learning-project-two.vercel.app/api/fetchVnexpressNews.js');
                this.articles = response.data
                this.saveToLocalStorage()
            } catch (error) {
                console.error('Lỗi:', error)
            } finally {
                this.loading = false
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('newsStore:articles', JSON.stringify(this.articles))
        },
    },
})
