<template>
    <div class="todo-input-container">
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Nhập việc cần làm" class="todo-input"/>
        <button class="add-button" @click="addTodo">Thêm</button>
    </div>
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

<style scoped>
.todo-input-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.todo-input {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #0056b3;
}
</style>
