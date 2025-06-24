<template>
    <div class="news-list">
        <h1>Multiple News Sources</h1>
        <div v-for="source in sources" :key="source.url" class="news-source">
            <h2>{{ getDomainName(source.url) }}</h2>
            <ul>
                <li v-for="article in source.articles" :key="article.url">
                    <a :href="article.url" target="_blank">{{ article.title }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import type { Source } from '@/types/source'

export default defineComponent({
    name: 'MultipleNewsView',
    setup() {
        const sources = ref<Source[]>([])

        onMounted(async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/multiple-news')
                sources.value = response.data
            } catch (error) {
                console.error('Lỗi:', error)
            }
        })

        const getDomainName = (url: string) => {
            try {
                return new URL(url).hostname
            } catch {
                return url
            }
        }

        return { sources, getDomainName }
    },
})
</script>

<style scoped>
.news-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #212121;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.news-list h1 {
    text-align: center;
    margin-bottom: 20px;
}

.news-source {
    margin-bottom: 30px;
}

.news-source h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #007bff;
}

.news-source ul {
    list-style: none;
    padding: 0;
}

.news-source li {
    margin-bottom: 10px;
}

.news-source a {
    text-decoration: none;
    color: #fff;
}

.news-source a:hover {
    text-decoration: underline;
}
</style>
