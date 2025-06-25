<template>
    <div class="url-input-container">
        <input v-model="url" placeholder="Enter URL" @keyup.enter="submitUrl" />
        <button @click="submitUrl">Submit</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUrlStore } from '@/stores/urlStore'

export default defineComponent({
    name: 'UrlInput',
    setup() {
        const url = ref('')
        const urlStore = useUrlStore()

        const submitUrl = () => {
            if (url.value.trim()) {
                urlStore.addUrl(url.value.trim())
                url.value = ''
            }
        }

        return { url, submitUrl }
    },
})
</script>

<style scoped>
.url-input-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>
