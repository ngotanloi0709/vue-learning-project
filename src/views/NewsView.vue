<template>
    <v-container class="news-list">
        <v-card>
            <v-card-title
                >VnExpress News
                <v-spacer />
                <v-btn color="primary" @click="reloadNews">Load lại dữ liệu</v-btn>
            </v-card-title>
            <v-card-text>
                <v-progress-linear v-if="newsStore.loading" indeterminate color="primary" />
                <v-list v-else>
                    <v-list-item v-for="article in newsStore.articles" :key="article.url">
                        <v-list-item-content>
                            <v-list-item-title>
                                <a :href="article.url" target="_blank">{{ article.title }}</a>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'

export default defineComponent({
    name: 'NewsList',
    setup() {
        const newsStore = useNewsStore()

        onMounted(() => {
            if (newsStore.articles.length === 0) {
                newsStore.fetchNews()
            }
        })

        const reloadNews = () => {
            newsStore.fetchNews()
        }

        return { newsStore, reloadNews }
    },
})
</script>
