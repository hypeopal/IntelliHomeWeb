import {createRouter, createWebHashHistory} from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/HomePage.vue';
import SignupPage from '../components/SignupPage.vue';
import ViewPage1 from "../views/ViewPage1.vue";
import ViewPage2 from "../views/ViewPage2.vue";
import FindPassword from "../components/FindPassword.vue";

const routes = [
    {path: '/', redirect: '/home/view1'},
    {path: '/login', component: LoginPage},
    {path: '/signup', component: SignupPage},
    {path: '/findpassword', component: FindPassword},
    {
        path: '/home',
        component: HomePage,
        meta: {requiresAuth: true},
        children: [
            {path: 'view1', component: ViewPage1},
            {path: 'view2', component: ViewPage2},
        ]
    },
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
