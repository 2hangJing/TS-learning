/*
 * @Author: monai
 * @Date: 2021-07-13 13:58:35
 * @LastEditors: monai
 * @LastEditTime: 2021-07-13 18:44:04
 */
let activeEffect: Function | null;
const targetMap = new WeakMap();
const effectStack: Function[] = [];

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
    if(activeEffect === null)return;
    //  获取当前 target 对应的所有 key 对应的 effect Map 
    let keyEffectMap: Map<string, Function[]> | undefined = targetMap.get(target);
    //  所有 target map中不存在当前的 target，
    if(!keyEffectMap){

        keyEffectMap = new Map<string, Function[]>();
        
        targetMap.set(target, keyEffectMap);
    }
    //  当前 propKey 对应的 effect 数组
    let effectArr: Function[] | undefined = keyEffectMap.get(propKey);

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

    let keyEffectMap: Map<string, Function[]> | undefined = targetMap.get(target);

    if(keyEffectMap === undefined)return;

    let effectArr: Function[] | undefined = keyEffectMap.get(propKey);

    if(effectArr === undefined) return;
    //  收集了当前 key 的 effect，全部触发一遍
    effectArr.forEach(effect=> effect());
}
// effect 
const effect = (func: Function)=>{
    const effectFunc = createEffect(func);

    effectFunc();
}
// createEffect
const createEffect = (fn)=>{
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

    }
    return effectFunc;
}


let reactObj = reactive({id: 10});

effect(()=>{


    
    console.log( 'reactObj', reactObj );
});

// setInterval(()=> reactObj.id+=1, 1000);