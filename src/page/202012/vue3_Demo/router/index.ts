
import { createRouter, createWebHashHistory  } from 'vue-router';

const routerList = [
    {
        path: '/class',
        component: () => import('../template/class.vue')
    },{
        path: '/function',
        component: () => import('../template/function.vue')
    },{
        path: '/generics',
        component: () => import('../template/generics.vue')
    },
]

const router = createRouter({
    routes: routerList,
    history: createWebHashHistory()
});

export default router;

