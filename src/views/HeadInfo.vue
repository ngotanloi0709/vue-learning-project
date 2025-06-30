<template>
    <div>
        <v-card>
            <UrlInput />
            <v-card-text>
                <UrlList />
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import UrlInput from '@/components/UrlHeadInfo/UrlInput.vue'
import UrlList from '@/components/UrlHeadInfo/UrlList.vue'

export default {
    name: 'HomeView',
    components: {
        UrlInput,
        UrlList,
    },
}
</script>
