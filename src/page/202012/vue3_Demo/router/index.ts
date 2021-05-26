
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
    },{
        path: '/enum',
        component: () => import('../template/enum/enum.vue')
    },{
        path: '/typeCompatibility',
        component: () => import('../template/typeCompatibility/typeCompatibility.vue')
    },{
        path: '/advancedType',
        component: () => import('../template/advancedType/advancedType.vue')
    },{
        path: '/Keyword',
        component: () => import('../template/Keyword/Keyword.vue')
    },{
        path: '/BuiltInType',
        component: () => import('../template/BuiltInType/BuiltInType.vue')
    },
]

const router = createRouter({
    routes: routerList,
    history: createWebHashHistory()
});

export default router;

