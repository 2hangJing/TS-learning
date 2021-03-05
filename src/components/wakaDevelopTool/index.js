/*
 * @Author: monai
 * @Date: 2020-06-28 15:50:14
 * @LastEditors: monai
 * @LastEditTime: 2021-01-08 16:48:45
 */
import loadingComponent from './loading.vue';
import cdnImg from './stable-img.vue';
import toastComponent from './toast.vue';
import axios 	from 'axiosActivity';

import { createApp, reactive } from 'vue';

export default {
    init_component(app){ app.component('cdnImg', cdnImg); },

    init_loading(app){
        //  provide inject 解决传参问题
        // let loadingSwitchObj = reactive({ visible: false });
        // let appLoading = createApp(loadingComponent);
        // let root = document.createElement('div');
        // document.body.appendChild(root);
        // appLoading.provide('loadingSwitchObj', loadingSwitchObj).mount(root);
        // app.config.globalProperties.$loadingShow = ()=>{
        //     loadingSwitchObj.visible = true;
        // }
        // app.config.globalProperties.$loadingClose = ()=>{
        //     loadingSwitchObj.visible = false;
        // }


        let root = document.createElement('div');
        document.body.appendChild(root);
        //  vm 为根组件实例
        let vm = createApp(loadingComponent).mount(root);
        app.config.globalProperties.$loadingShow = ()=>{
            vm.visible = true;
        }
        app.config.globalProperties.$loadingClose = ()=>{
            vm.visible = false;
        }
    },
    init_directive(app){
        //  直播状态与uid 列表。
        let uidArr = [];
        //  通过事件委托将跳转统一控制，优化内存占用与性能
        document.body.addEventListener('click', e=>{

            const event = e || window.event;
            const path = event.path || (event.composedPath && event.composedPath());

            //  去除 window document html body dom检测
            for(let dom of path.slice(0, path.length - 4)){

                let item = uidArr[dom.getAttribute('v-jumpIndex')];

                if(item){

                    let {uid, liveStatus} = item;

                    if(uid == undefined || liveStatus == undefined){
                        console.error(`\n自定义指令 v-jump 传参错误! `, '\n传参：', item, '\nDOM：', dom);

                        return;
                    }

                    let url = 'wakaweb://waka.media/' + (liveStatus ? 'audio_live' : 'profile') + '?uid=' + uid;
                    console.log( '跳转URL：', url );
                    location.href = url;

                    break;
                }
            }
        });

        app.directive('jump', {
            mounted(el, binding){

                //  liveStatus 不存在时默认行为是：未直播，默认值赋为0
                let {uid, liveStatus = 0} = binding.value || {};

                // 通过 JS 数组存取 uid 敏感数据，避免在 DOM 中直接注入 uid 被窃取。
                el.setAttribute('v-jumpIndex', uidArr.length);
                // ios 委托事件BUG兼容
                el.style.cursor= 'pointer';

                uidArr.push({uid, liveStatus});
            },
            updated(el, binding){
                //  liveStatus 不存在时默认行为是：未直播，默认值赋为0
                let {uid, liveStatus = 0} = binding.value || {}, index = el.getAttribute('v-jumpIndex')
                //  异步更新时对 uidArr 进行更新
                uidArr.splice(index, 1, {uid, liveStatus});
            }
        })
    },
    init_language(app, arg){

        let lang = 'EN',
            //  需要反转的国家简称
            rtlCountry = ['EG', 'XM', 'ME', 'AR'],
            reactiveObj =  reactive({text: {}, rule: {}});

        document.body.style.direction = rtlCountry.includes(lang) ? 'rtl' : 'initial';

        app.mixin({
            computed: {
                LANG(){ return lang },
                TEXT(){ return reactiveObj.text },
                RULE(){ return reactiveObj.rule }
            }
        });
    },
    //	Vue3 全局绑定
    init_axios(app){ app.config.globalProperties.$http = axios; },

    init_toast(app){

        let root = document.createElement('div');
        document.body.appendChild(root);
        //  vm 为根组件实例
        let vm = createApp(toastComponent).mount(root);
      
        app.config.globalProperties.$toastShow = config =>{

            Object.assign(vm, {visible: true}, (config ? config : {}))
        }
        app.config.globalProperties.$toastClose = () =>{
            vm.visible = false;
        }
    },
    //  Vue3 传入单次创建的实例
    install(app, json){
        //  多语言初始化
        this.init_language(app)
        //  ajax loading
        this.init_loading(app);
        //  跳转指令
        this.init_directive(app);
         //  axios挂载
        this.init_axios(app);
        //  全局图片 CDN 组件注入
        this.init_component(app);
        // ajax fail toast
        this.init_toast(app);
    }
}
