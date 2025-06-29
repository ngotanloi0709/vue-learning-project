<template>
    <v-row class="todo-input-container">
        <v-col cols="9">
            <v-text-field v-model="newTodo" label="Nhập việc cần làm" outlined dense />
        </v-col>
        <v-col cols="3" class="d-flex align-center">
            <v-btn color="primary" @click="addTodo">Thêm</v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default defineComponent({
    name: 'TodoInput',
    setup() {
        const newTodo = ref('')
        const todoStore = useTodoStore()

        const addTodo = () => {
            if (newTodo.value.trim()) {
                todoStore.addTodo(newTodo.value.trim())
                newTodo.value = ''
            }
        }

        return { newTodo, addTodo }
    },
})
</script>
