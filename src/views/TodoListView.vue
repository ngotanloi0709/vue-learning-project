<template>
    <v-container class="todo-list-container">
        <v-card>
            <v-card-title class="title">Todo List</v-card-title>
            <v-card-text>
                <transition-group name="fade" tag="v-list">
                    <TodoInput @add="addTodo" />
                    <TodoItem
                        v-for="todo in sortedTodos"
                        :key="todo.id"
                        :todo="todo"
                        @toggle="toggleTodo"
                        @delete="deleteTodo"
                    />
                </transition-group>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
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
            if (todo) {
                todo.completed = !todo.completed
            }
        }

        const deleteTodo = (id: number) => {
            const index = todos.findIndex((t) => t.id === id)
            if (index !== -1) todos.splice(index, 1)
        }

        const sortedTodos = computed(() => {
            return [...todos].sort((a, b) => {
                if (a.completed === b.completed) return 0
                return a.completed ? 1 : -1
            })
        })

        return { todos, addTodo, toggleTodo, deleteTodo, sortedTodos }
    },
})
</script>

<style scoped>
.todo-list-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
