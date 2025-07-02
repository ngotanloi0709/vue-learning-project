<template>
    <div class="d-flex justify-space-between">
        <v-text-field v-model="url" placeholder="Nhập URL" @keyup.enter="submitUrl" />
        <div class="mt-3 mx-3">
            <v-btn @click="submitUrl" color="blue-lighten-3">Submit</v-btn>
            <v-btn class="ms-1" @click="submitCsv" color="grey-lighten-1">
                <label for="csv-upload">Upload CSV</label>
                <input id="csv-upload" type="file" accept=".csv" @change="submitCsv" style="display: none" />
            </v-btn>
            <v-btn class="ms-1" @click="submitCsvSplit" color="grey-lighten-1">
                <label for="csv-upload-split">Upload CSV (Split)</label>
                <input id="csv-upload-split" type="file" accept=".csv" @change="submitCsvSplit" style="display: none" />
            </v-btn>
            <v-btn class="ms-1" @click="submitCsvBatch" color="grey-lighten-1">
                <label for="csv-upload-batch">Upload CSV (Batch)</label>
                <input id="csv-upload-batch" type="file" accept=".csv" @change="submitCsvBatch" style="display: none" />
            </v-btn>
        </div>
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
            const trimmedUrl = url.value.trim()

            if (trimmedUrl) {
                urlStore.pushSingleUrl(trimmedUrl)
                url.value = ''
            }
        }

        const submitCsv = (event: Event) => {
            const fileInput = event.target as HTMLInputElement
            const file = fileInput.files?.[0]

            if (!file) return

            const reader = new FileReader()
            reader.onload = async (e) => {
                const content = e.target?.result as string
                const urls = content
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line)

                await urlStore.pushMultipleUrls(urls)
            }
            reader.readAsText(file)

            // erase
            fileInput.value = ''
            fileInput.files = null
        }

        const submitCsvSplit = (event: Event) => {
            const fileInput = event.target as HTMLInputElement
            const file = fileInput.files?.[0]

            if (!file) return

            const reader = new FileReader()
            reader.onload = async (e) => {
                const content = e.target?.result as string
                const urls = content
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line)

                await Promise.all(urls.map((url) => urlStore.pushSingleUrl(url)))
            }
            reader.readAsText(file)

            // erase
            fileInput.value = ''
            fileInput.files = null
        }

        const submitCsvBatch = (event: Event) => {
            const fileInput = event.target as HTMLInputElement
            const file = fileInput.files?.[0]

            if (!file) return

            const reader = new FileReader()
            reader.onload = async (e) => {
                const content = e.target?.result as string
                const urls = content
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line)

                const batchSize = 5
                const batches = []
                for (let i = 0; i < urls.length; i += batchSize) {
                    batches.push(urls.slice(i, i + batchSize))
                }

                await Promise.all(
                  batches.map(batch => urlStore.pushMultipleUrls(batch))
                )
            }
            reader.readAsText(file)

            // erase
            fileInput.value = ''
            fileInput.files = null
        }

        return { url, submitUrl, submitCsv, submitCsvSplit , submitCsvBatch }
    },
})
</script>
