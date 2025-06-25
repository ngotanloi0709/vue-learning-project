<template>
    <ul class="url-list">
        <li v-for="item in urlStore.urls" :key="item.id" :class="item.status">
            <p><strong>URL:</strong> {{ item.url }}</p>
            <p v-if="item.status === 'pending'">Status: Pending...</p>
            <p v-else-if="item.status === 'success'">
                <strong>Title:</strong> {{ item.data?.title || 'No title' }}
                <!-- <ul class="meta-tags">
                    <li v-for="(meta, index) in item.data?.metaTags" :key="index">
                        <strong>{{ meta.name || 'Unnamed' }}:</strong> {{ meta.content || 'No content' }}
                    </li>
                </ul> -->
            </p>
            <p v-else-if="item.status === 'error'">
                <strong>Error:</strong> {{ item.error }}
            </p>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUrlStore } from '@/stores/urlStore'

export default defineComponent({
    name: 'UrlList',
    setup() {
        const urlStore = useUrlStore()
        return { urlStore }
    },
})
</script>

<style scoped>
p {
  color: black;
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

.meta-tags {
    margin-top: 10px;
    padding-left: 20px;
    list-style: disc;
}

.meta-tags li {
    margin-bottom: 5px;
}
</style>
