// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import search from '../view/search.vue'
import login from '../view/login.vue'

const routes = [
    {
        path: '/search',
        name: 'search',
        component: search
    },
    {
        path: '/',
        name: 'login',
        component: login
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
