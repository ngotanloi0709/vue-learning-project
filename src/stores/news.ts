import type { Article } from "@/types/article";
import { defineStore } from "pinia";
import axios from "axios";

export const useNewsStore = defineStore('news', {
    state: () => ({
        articles: [] as Article[],
    }),
    actions: {
        async fetchNews() {
            try {
                // const response = await axios.get('http://localhost:3000/api/news');
                const response = await axios.get('https://vue-learning-project-two.vercel.app/api/fetchVnexpressNews.js');
                this.articles = response.data;
            } catch (error) {
                console.error('Lỗi:', error);
            }
        },
    },
});
