<template>
    <div class="todo-list-container">
        <h1 class="title">Todo List</h1>
        <TodoInput @add="addTodo" />
        <ul class="todo-list">
            <TodoItem
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                @toggle="toggleTodo"
                @delete="deleteTodo"
            />
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TodoInput from '@/components/Todo/TodoInput.vue'
import TodoItem from '@/components/Todo/TodoItem.vue'
import type { Todo } from '@/types/todo'

export default defineComponent({
    name: 'TodoListView',
    components: {
        TodoInput,
        TodoItem,
    },
    setup() {
        const todos = reactive<Todo[]>([
            { id: 1, text: 'Learn Vue', completed: false },
            { id: 2, text: 'Build a Todo App', completed: false },
        ])

        const addTodo = (text: string) => {
            todos.push({
                id: Date.now(),
                text,
                completed: false,
            })
        }

        const toggleTodo = (id: number) => {
            const todo = todos.find((t) => t.id === id)
            if (todo) todo.completed = !todo.completed
        }

        const deleteTodo = (id: number) => {
            const index = todos.findIndex((t) => t.id === id)
            if (index !== -1) todos.splice(index, 1)
        }

        return { todos, addTodo, toggleTodo, deleteTodo }
    },
})
</script>

<style scoped>
.todo-list-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #212121;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    font-size: 2rem;
    /* color: #333; */
    margin-bottom: 20px;
}

.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
