import {createRouter, createWebHashHistory} from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/HomePage.vue';
import SignupPage from '../components/SignupPage.vue';
import OverviewPage from "../views/OverviewPage.vue";
import ScenePage from "../views/ScenePage.vue";
import FindPassword from "../components/FindPassword.vue";
import DevicePage from "../views/DevicePage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import SettingPage from "../views/SettingPage.vue";

const routes = [
    {path: '/', redirect: '/home/overview'},
    {path: '/login', component: LoginPage},
    {path: '/signup', component: SignupPage},
    {path: '/findpassword', component: FindPassword},
    {
        path: '/home',
        component: HomePage,
        meta: {requiresAuth: true},
        children: [
            {path: 'overview', component: OverviewPage},
            {path: 'scene', component: ScenePage},
            {path: 'device', component: DevicePage},
            {path: 'profile', component: ProfilePage},
            {path: 'setting', component: SettingPage},
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
