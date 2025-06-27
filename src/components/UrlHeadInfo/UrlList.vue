<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <h3>Pending</h3>
                <transition-group name="fade" tag="ul" class="url-list">
                    <li v-for="item in sortedUrls.pending" :key="item.id" class="pending">
                        <p><strong>URL:</strong> {{ item.url }}</p>
                        <p>Status: Pending...</p>
                    </li>
                </transition-group>
            </v-col>

            <v-col cols="12" md="4">
                <h3>Success</h3>
                <transition-group name="fade" tag="ul" class="url-list">
                    <li v-for="item in sortedUrls.success" :key="item.id" class="success">
                        <p><strong>URL:</strong> {{ item.url }}</p>
                        <p><strong>Title:</strong> {{ item.data?.title || 'Không có title' }}</p>
                    </li>
                </transition-group>
            </v-col>

            <v-col cols="12" md="4">
                <h3>Error</h3>
                <transition-group name="fade" tag="ul" class="url-list">
                    <li v-for="item in sortedUrls.error" :key="item.id" class="error">
                        <p><strong>URL:</strong> {{ item.url }}</p>
                        <p><strong>Error:</strong> {{ item.error || 'Lỗi không xác định' }}</p>
                    </li>
                </transition-group>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useUrlStore } from '@/stores/urlStore'

export default defineComponent({
    name: 'UrlList',
    setup() {
        const urlStore = useUrlStore()

        const sortedUrls = computed(() => {
            const pending = urlStore.urls
                .filter((item) => item.status === 'pending')
                .sort((a, b) => b.id - a.id)
            const success = urlStore.urls
                .filter((item) => item.status === 'success')
                .sort((a, b) => b.id - a.id)
            const error = urlStore.urls
                .filter((item) => item.status === 'error')
                .sort((a, b) => b.id - a.id)

            return { pending, success, error }
        })

        return { sortedUrls }
    },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.url-list {
    list-style: none;
    padding: 0;
}

.url-list li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.url-list li.pending {
    background-color: #fff3cd;
}

.url-list li.success {
    background-color: #d4edda;
}

.url-list li.error {
    background-color: #f8d7da;
}
</style>
