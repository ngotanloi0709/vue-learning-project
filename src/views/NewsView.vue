<template>
    <div class="news-list">
        <h1>VnExpress News</h1>
        <ul>
            <li v-for="article in newsStore.articles" :key="article.url">
                <a :href="article.url" target="_blank">{{ article.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'

export default defineComponent({
    name: 'NewsList',
    setup() {
        const newsStore = useNewsStore()

        onMounted(() => {
            newsStore.fetchNews()
        })

        return { newsStore }
    },
})
</script>

<style scoped>
.news-list {
    max-width: 600px;
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

.news-list ul {
    list-style: none;
    padding: 0;
}

.news-list li {
    margin-bottom: 10px;
}

.news-list a {
    text-decoration: none;
    color: #007bff;
}

.news-list a:hover {
    text-decoration: underline;
}
</style>
