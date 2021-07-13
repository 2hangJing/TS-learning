<!--
 * @Author: monai
 * @Date: 2021-07-07 16:34:54
 * @LastEditors: monai
 * @LastEditTime: 2021-07-13 09:56:42
-->
<template>
    <div>
        <h1>Vue3</h1>
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive, watchEffect } from 'vue';
    import { ReactiveFlags, effect } from '@vue/reactivity'
    export default defineComponent({
        setup(){
            // 代理对象会通过 ReactiveFlags.raw 引用原始对象
            // 代理对象根据它是 reactive 或 readonly 的， 将 ReactiveFlags.isReactive 或 ReactiveFlags.isReadonly 属性值设置为 true
            let refUserInfo = reactive({id: 20, name: 'name'});
            console.log( 'refUserInfo', refUserInfo[ReactiveFlags.IS_REACTIVE] ); // true

            //  实现 effect 
            let zjeffect = ()=>{

            }

            //  track
            // let 

        }
    });
</script>
<style lang='scss'>
    // @import ;
</style>