import { defineStore } from 'pinia'
import type { Todo } from '@/types/todo'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [
            { id: 1, text: 'Learn Vue', completed: false },
            { id: 2, text: 'Build a Todo App', completed: false },
        ] as Todo[],
    }),
    actions: {
        addTodo(text: string) {
            this.todos.push({
                id: Date.now(),
                text,
                completed: false,
            })
        },
        toggleTodo(id: number) {
            const todo = this.todos.find((t) => t.id === id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo(id: number) {
            const index = this.todos.findIndex((t) => t.id === id)
            if (index !== -1) this.todos.splice(index, 1)
        },
    },
    getters: {
        sortedTodos: (state) => {
            return [...state.todos].sort((a, b) => {
                if (a.completed === b.completed) return 0
                return a.completed ? 1 : -1
            })
        },
    },
})
