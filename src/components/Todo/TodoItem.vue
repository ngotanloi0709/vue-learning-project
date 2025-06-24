<template>
    <li class="todo-item">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <div class="actions">
            <button class="toggle-button" @click="$emit('toggle', todo.id)">✔</button>
            <button class="delete-button" @click="$emit('delete', todo.id)">❌</button>
        </div>
    </li>
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
.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.todo-item:last-child {
    border-bottom: none;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.actions {
    display: flex;
    gap: 10px;
}

.toggle-button,
.delete-button {
    padding: 5px 10px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.toggle-button {
    background-color: #28a745;
    color: #fff;
}

.toggle-button:hover {
    background-color: #218838;
}

.delete-button {
    background-color: #dc3545;
    color: #fff;
}

.delete-button:hover {
    background-color: #c82333;
}
</style>
