/*
 * @Author: monai
 * @Date: 2021-07-13 13:58:35
 * @LastEditors: monai
 * @LastEditTime: 2021-07-15 17:25:40
 */


import { TYPE_effectOptions, TYPE_effect } from './type';

let activeEffect: TYPE_effect | undefined;
const targetMap = new WeakMap();
const effectStack: TYPE_effect[] = [];

const reactive = (obj)=>{

    let proxyOptions = {
        get(target, propKey){
            //  收集依赖
            track(target, propKey);

            return Reflect.get(target, propKey);
        },
        set(target, propKey, value){
            //  触发 effect
            trigger(target, propKey);

            return Reflect.set(target, propKey, value);
        }
    };

    return new Proxy(obj, proxyOptions);
};
//  收集
const track = (target, propKey)=>{

    //  不存在当前激活的 activeEffect，代表当前触发 getter的不是 effect 函数
    if(activeEffect === undefined)return;
    //  获取当前 target 对应的所有 key 对应的 effect Map 
    let keyEffectMap: Map<string, TYPE_effect[]> | undefined = targetMap.get(target);
    //  所有 target map中不存在当前的 target，
    if(!keyEffectMap){

        keyEffectMap = new Map<string, TYPE_effect[]>();
        
        targetMap.set(target, keyEffectMap);
    }
    //  当前 propKey 对应的 effect 数组
    let effectArr: TYPE_effect[] | undefined = keyEffectMap.get(propKey);

    if(effectArr === undefined){
        effectArr = [];
        keyEffectMap.set(propKey, effectArr);
    }
    //  propKey 对应的 effectArr 中不包含当前触发 getter 的 effect。
    if(!effectArr.includes(activeEffect)){
        //  收集 effect 
        effectArr.push(activeEffect)
    }
}

//  触发
const trigger = (target, propKey)=>{

    let keyEffectMap: Map<string, TYPE_effect[]> | undefined = targetMap.get(target);

    if(keyEffectMap === undefined)return;

    let effectArr: TYPE_effect[] | undefined = keyEffectMap.get(propKey);

    if(effectArr === undefined) return;
    //  收集了当前 key 的 effect，全部触发一遍
    effectArr.forEach(effect=> {
        if(effect.options.scheduler){
            effect.options.scheduler(effect);
        }else{
            effect();
        }
    });
}
// effect 
const effect = (func: Function, options: TYPE_effectOptions)=>{
    const effectFunc = createEffect(func, options);
    
    !options.lazy && effectFunc();

    return effectFunc;
}
// createEffect
const createEffect = (fn, options)=>{
    const effectFunc = ()=>{
        //  当前的 effectFunc 在执行栈 effectStack 中，不再重复执行
        if(effectStack.includes(effectFunc))return;
        //  入栈
        effectStack.push(effectFunc);
        //  将当前创建的 effectFunc 暂存在 activeEffect，方便 fn 函数调用时触发 track，从而存储 activeEffect。
        activeEffect = effectFunc;
        //  执行调用，触发 getter -> track
        fn();
        //  执行完毕后出栈
        effectStack.pop();
        //  A fn() -> A setter 执行时可能触发另外一个 B setter -> trigger -> effectArr.forEach(effect=> effect()) -> activeEffect = B effect
        //  当前 effect 执行完毕后需要将 activeEffect 赋值为下一个 effect
        activeEffect = effectStack[effectStack.length - 1];
    }
    
    effectFunc.options = options;

    return effectFunc;
}


//  watchEffect
const watchEffect = (fun: (onInvidata: (cleanFunc: ()=>void)=>void)=>void)=>{
    
    let cleanup: Function;

    const onInvidata = (cleanFunc: Function)=>{
        cleanup = cleanFunc;
    };

    let getter = ()=>{
        cleanup && cleanup();

        fun(onInvidata);
    }

    effect(getter, {lazy: false});
}

let obj = reactive({id: 10});


// onInvidata 副作用清楚
// watchEffect(async onInvidata =>{

//     let id = obj.id;
//     let isFirst = true;
//     console.log( 'watchEffect id ****', id );
//     onInvidata(()=>isFirst = false);
    
//     await new Promise(res=> setTimeout(res, 1000));

//     if(isFirst){
//         console.log( '第一次执行：obj.id', id );
//     }else{
//         console.log( '后续执行：obj.id', id);
//     }
// });

// obj.id++;
// obj.id++;




//  scheduler 调度器
// let obj = reactive({id: 10});
// let isRuning = false;
// effect(()=>{
//     console.log( 'obj----', obj.id );
// },{
//     lazy: false,
//     scheduler: (effectItem)=>{
//         if(isRuning)return;
//         isRuning = true;
//         Promise.resolve().then(res=>{
//             effectItem();
//         });
//     }
// })
// obj.id ++;
// obj.id ++;
// obj.id ++;