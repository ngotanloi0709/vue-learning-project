<template>
    <v-list-item>
        <v-list-item-title class="d-flex align-center justify-space-between">
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <div>
                <v-btn :disabled="todo.completed" size="small" icon color="success" @click="toggleTodo(todo.id)"> ✔ </v-btn>
                <v-btn size="small" icon color="error" @click="deleteTodo(todo.id)">✖</v-btn>
            </div>
        </v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">
import type { Todo } from '@/types/todo'
import { defineComponent, type PropType } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default defineComponent({
    name: 'TodoItem',
    props: {
        todo: {
            type: Object as PropType<Todo>,
            required: true,
        },
    },
    setup() {
        const todoStore = useTodoStore()

        const toggleTodo = (id: number) => {
            todoStore.toggleTodo(id)
        }

        const deleteTodo = (id: number) => {
            todoStore.deleteTodo(id)
        }

        return { toggleTodo, deleteTodo }
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
