<template>
    <v-container>
        <v-card class="tag-list-card">
            <v-card-title>
                <h3>Danh sách các liên kết</h3>
            </v-card-title>
            <v-card-text>
                <v-progress-linear v-if="tagStore.loading" indeterminate color="primary" />
                <v-list v-else>
                    <v-list-item v-for="(tag, index) in tagStore.tags" :key="index" class="tag-item">
                        <v-list-item-content>
                            <v-list-item-title> <strong>Text:</strong> {{ tag.text || 'Không có nội dung' }} </v-list-item-title>
                            <v-list-item-title class="ms-3">
                                <a :href="tag.href" target="_blank" rel="noopener noreferrer">{{ tag.href || 'Lỗi' }}</a>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTagStore } from '@/stores/tagStore'

export default defineComponent({
    name: 'TagList',
    setup() {
        const tagStore = useTagStore()

        return {
            tagStore,
        }
    },
})
</script>

<style scoped>
.tag-list-card {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.tag-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #ffffff;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.tag-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

a {
    color: #1976d2;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #004ba0;
    text-decoration: underline;
}
</style>
