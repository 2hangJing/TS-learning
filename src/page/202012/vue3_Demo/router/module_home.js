function asyncComponents(name, path= '../template/'){

    return ()=> import(
        /* webpackChunkName: "[request]" */
        /* webpackPrefetch: true */
    `../template/${name}.vue`);
}

export default [
    {
        path: '/home',
        name: 'home',
        component: asyncComponents('home'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/car',
        name: 'car',
        component: asyncComponents('car'),
        meta: {
            title: 'car'
        }
    }
]