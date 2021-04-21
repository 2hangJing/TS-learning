/*
 * @Author: monai
 * @Date: 2021-04-21 15:45:12
 * @LastEditors: monai
 * @LastEditTime: 2021-04-21 17:47:11
 */
import { defineComponent } from 'vue';

//  类型兼容性
//  TS 类型兼容是 基于结构性类型，结构性类型是基于类型的组成结构，且不要求明确地声明
export default defineComponent({
    data() {
        return {}
    },
    mounted() {
        console.log('````````````````` typeCompatibility start `````````````````');
        //  结构性类型示例，名义类型语言一下报错，因为 B 并不是基于接口 A，而 TS 结构性类型则是正确。
        interface A{ name: string };
        class B { 
            public name: string = '结构性类型简单示例';
            constructor(){}
        }
        let b: A = new B();
        console.log( b.name );

        // 赋值兼容行判断
        interface C{ name: string; age: number };
        let a: A = { name: 'a' };
        let c: C = { name: 'c', age: 10 };
        //  a 需要 string 类型的 name，c 包含则 a 赋值为 c 成立
        // a = c;
        //  c 需要 string 类型的 name与 number类型age，所以 c 赋值为 a 不成立
        // c = a;
        //  原变量需要是赋值变量的子类型

        // 函数赋值类型兼容
        // 1. 参数类型兼容与 赋值兼容行判断相反
        // 2. 返回值类型要符合 赋值兼容行判断
        let funcA = (name: string, age: number): object=>{ 
            let id = age +10;
            return {id, userName: name + 'userName'};
        }
        let funcB = (name: string): object=>{ 
        
            return {userName: name};
        }

        funcA = funcB;
        
        

    

        console.log('````````````````` typeCompatibility end `````````````````');
    }
});