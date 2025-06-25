<template>
    <v-list-item>
        <v-list-item-title class="d-flex align-center justify-space-between">
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <div>
                <v-btn :disabled="todo.completed" size="small" icon color="success" @click="$emit('toggle', todo.id)">✔</v-btn>
                <v-btn size="small" icon color="error" @click="$emit('delete', todo.id)">✖</v-btn>
            </div>
        </v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">
import type { Todo } from '@/types/todo'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
    name: 'TodoItem',
    emits: ['toggle', 'delete'],
    props: {
        todo: {
            type: Object as PropType<Todo>,
            required: true,
        },
    },
})
</script>

<style scoped>
.completed {
    text-decoration: line-through;
    color: gray;
}

:deep(.v-btn) {
    margin-left: 8px;
}

:deep(.v-list-item-title) {
    padding: 8px 16px;
    border-bottom: 1px solid #e0e0e0;
}
</style>
