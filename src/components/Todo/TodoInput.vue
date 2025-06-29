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

export default defineComponent({
    name: 'TodoInput',
    emits: ['add'],
    setup(_, { emit }) {
        const newTodo = ref('')

        const addTodo = () => {
            if (newTodo.value.trim()) {
                emit('add', newTodo.value.trim())
                newTodo.value = ''
            }
        }

        return { newTodo, addTodo }
    },
})
</script>
