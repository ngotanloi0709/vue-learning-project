<template>
    <v-container class="news-list">
        <v-card>
            <v-card-title
                >Multiple News Sources
                <v-spacer />
                <v-btn color="primary" @click="reloadSources">Load lại dữ liệu</v-btn>
            </v-card-title>
            <v-card-text>
                <v-progress-linear v-if="sources.loading" indeterminate color="primary" />
                <v-expansion-panels v-else>
                    <v-expansion-panel v-for="source in sources.sources" :key="source.url">
                        <v-expansion-panel-title>{{ source.url }}</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-list>
                                <v-list-item v-for="article in source.articles" :key="article.url">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <a :href="article.url" target="_blank">{{ article.title }}</a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useMultipleNewsStore } from '@/stores/multipleNews'

export default defineComponent({
    name: 'MultipleNewsView',
    setup() {
        const sources = useMultipleNewsStore()

        const reloadSources = () => {
            sources.fetchSources()
        }

        onMounted(() => {
            if (sources.sources.length === 0) {
                sources.fetchSources()
            }
        })

        const getDomainName = (url: string) => {
            try {
                return new URL(url).hostname
            } catch {
                return url
            }
        }

        return { sources, getDomainName, reloadSources }
    },
})
</script>
