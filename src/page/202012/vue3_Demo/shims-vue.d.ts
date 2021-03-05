/*
 * @Author: monai
 * @Date: 2021-02-22 15:23:33
 * @LastEditors: monai
 * @LastEditTime: 2021-03-01 16:45:59
 */

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component

    //  vue2
    // import Vue from 'vue';
    // export default Vue;
}

// declare module 'vue/types/vue' {
    // import VueRouter, {Route} from 'vue-router';
//     interface Vue {
//         $router: VueRouter;
//         $route: Route;
//     }
// } 