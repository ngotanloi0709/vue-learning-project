<template>
    <div>
        <UrlInput />
        <UrlList />
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
