<!--
 * @Author: monai
 * @Date: 2021-04-15 09:58:38
 * @LastEditors: monai
 * @LastEditTime: 2021-04-16 18:32:43
-->
<template>
    <div class="">
        
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        setup(){
            console.log(`*********** generics start ***********`);
            
            //  hellow world
            function genericsHellowWorld<T>(arg: T): T{
                return arg;
            }
            //  1. 通过给类型参数传参 <string> 明确告知 TS 此处为 string
            //  2. 也可以不传类型参数，TS 自动类型推断
            console.log( 'genericsHellowWorld: ', genericsHellowWorld<string>(`generics`) );

            //  泛型变量 Generic Type Variables
            function genericTypeVariables<T>(arg: Array<T>): T{
                return arg[0];
            }
            //  通过给类型参数指定 number | string 类型
            console.log('genericTypeVariables', genericTypeVariables<number | string>(['aa',8,7]));
            
            //  generics 当作接口的一个参数类型，接口内其他成员也可以使用当前参数类型
            interface genericInterface<T> {
                (arg: T): number;
                index: T;
            }
            function genericInterfaceFunc(num): genericInterface<number>{
                let funObj = function(arg){ return arg; } as genericInterface<number>;
                funObj.index= num;
                return funObj;
            }
            let genericInterfaceVar: genericInterface<number> = genericInterfaceFunc(10);
            console.log('genericInterfaceFunc: ', genericInterfaceVar(20));
            console.log('genericInterfaceVar.index：', genericInterfaceVar.index);

            //  generic class 
            //  class 中需要使用 非空断言运算符 断言未在 constructor 中初始化得属性
            class GenericClassNumber<T> {
                index!: T;
                add!: (x:T, y:T)=>T;
            }
            let myGenericClassNumber = new GenericClassNumber<number>();
            myGenericClassNumber.index = 10;
            myGenericClassNumber.add = (x, y)=> x+y;
            console.log('myGenericClassNumber: ', myGenericClassNumber.index);

            //  generic Constraints 泛型约束
            //  keyof 操作符 https://juejin.cn/post/6865860467307315207#heading-6
            function genericConstraintsFunc<T, K extends keyof T>(obj: T, key: K): void{
                console.log('genericConstraintsFunc: ', obj[key]);
            }
            genericConstraintsFunc({a: 1, b: 2}, 'a');
            // genericConstraintsFunc({a: 1, b: 2}, 'c'); // 报错
            

            
            
            console.log(`*********** generics end ***********`);
        }
    })
</script>
<style lang='scss'>
    
</style>