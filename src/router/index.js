import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/HomePage.vue';
import SignupPage from '../components/SignupPage.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', component: LoginPage },
    { path: '/home', component: HomePage, meta: { requiresAuth: true } },
    { path: '/signup', component: SignupPage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
