import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'
import NewsView from '../views/NewsView.vue'
import MultipleNewsView from '../views/MultipleNewsView.vue'
import HeadInfo from '../views/HeadInfo.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/todos',
            name: 'todos',
            component: TodoListView,
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView,
        },
        {
            path: '/multiple-news',
            name: 'multiple-news',
            component: MultipleNewsView,
        },
        {
            path: '/head-info',
            name: 'head-info',
            component: HeadInfo,
        },
    ],
})

export default router
