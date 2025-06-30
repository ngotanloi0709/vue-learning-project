<template>
    <div class="d-flex justify-space-between">
        <v-text-field v-model="url" placeholder="Nhập URL" @keyup.enter="submitUrl" />
        <div class="mt-3 mx-3">
            <v-btn @click="submitUrl" color="blue-lighten-3">Submit</v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTagStore } from '@/stores/tagStore'

export default defineComponent({
    name: 'UrlInput',
    setup() {
        const url = ref('')
        const tagStore = useTagStore()

        const submitUrl = () => {
            const trimmedUrl = url.value.trim()

            if (trimmedUrl) {
                tagStore.fetchTags(trimmedUrl)
                url.value = ''
            }
        }


        return { url, submitUrl }
    },
})
</script>
