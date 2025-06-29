<template>
    <v-container class="todo-list-container">
        <v-card>
            <v-card-title class="title">Todo List</v-card-title>
            <v-card-text>
                <transition-group name="fade" tag="v-list">
                    <TodoInput />
                    <TodoItem
                        v-for="todo in todoStore.sortedTodos"
                        :key="todo.id"
                        :todo="todo"
                    />
                </transition-group>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoInput from '@/components/Todo/TodoInput.vue'
import TodoItem from '@/components/Todo/TodoItem.vue'

export default defineComponent({
    name: 'TodoListView',
    components: {
        TodoInput,
        TodoItem,
    },
    setup() {
        const todoStore = useTodoStore()

        return { todoStore }
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
