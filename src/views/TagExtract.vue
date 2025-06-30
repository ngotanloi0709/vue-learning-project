<template>
    <v-container class="news-list">
        <v-card>
            <UrlInput />
            <v-card-text>
                <TagList />
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import UrlInput from '@/components/TagExtract/UrlInput.vue'
import TagList from '@/components/TagExtract/TagList.vue'

export default defineComponent({
    name: 'TagExtract',
    components: {
        UrlInput,
        TagList,
    },
})
</script>
