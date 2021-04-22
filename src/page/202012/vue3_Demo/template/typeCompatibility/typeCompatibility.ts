/*
 * @Author: monai
 * @Date: 2021-04-21 15:45:12
 * @LastEditors: monai
 * @LastEditTime: 2021-04-22 17:51:15
 */
import { defineComponent } from 'vue';

//  类型兼容性
//  TS 类型兼容是 基于结构性类型，结构性类型是基于类型的组成结构，且不要求明确地声明

//  ************** 重要 **************
//  协变、逆变 https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
//  TS 中类型兼容绝大多数是符合 协变的（父类型-> 子类型），赋值、函数返回值类型兼容等
//  函数的参数类型兼容 
//  strict: true 模式下 是逆变（子类型->父类型）
//  strict: false 模式下 是双向协变（父->子 | 子 ->父）

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
        //  满足协变，按照结构性类型来说：a是父类，b是子类，可以这么理解：b extend a { age: 10 }，相当于b继承a。
        //  所以从 a（父）->b(子) 满足协变，符合类型兼容。
        // a = c;
        //  反之不成立
        // c = a;
        
        // 函数赋值类型兼容
        // 总结
        // 1. 严格模式下参数满足逆变、非严格模式下参数满足双向协变
        // 2. 返回值类型要符合 协变

        //  1 参数不同兼容示例
        //  按照结构类型：argB父类，argA子类，所以参数满足逆变
        let funcArgA = (name: string, age: number)=>{};
        let funcArgB = (name: string)=>{};
        funcArgA = funcArgB;
        
        //  2 返回类型不同兼容示例
        let funcReturnA = ()=>({name: 'funcReturnA'});
        let funcReturnB = ()=>({name: 'funcReturnB', type: 2});
        funcReturnA = funcReturnB;

        enum EventType { Mouse, Keyboard }
        interface Event { timestamp: number; }
        interface MouseEvent extends Event { x: number; y: number }
        interface KeyEvent extends Event { keyCode: number }
        let event: Event = { timestamp: 10 };
        let mouseEvent: MouseEvent = { timestamp: 10, x: 1, y: 2 };
        function listenEvent(eventType: EventType, handler: (n: MouseEvent) => void) {
            /* ... */
            handler(mouseEvent)
        }
        // Unsound, but useful and common
        listenEvent(EventType.Mouse, (e: Event) => console.log(e));

        // let t1 = (): Event=>({ timestamp: 10 });
        // let t2 = (): MouseEvent=>({ timestamp: 10, x: 1, y: 2 });
        // t1 = t2; 返回值满足协变，类型兼容。
        // let t3 = (e: Event)=>{};
        // let t4 = (e: MouseEvent)=>{};
        // t4 = t3;
    

        console.log('````````````````` typeCompatibility end `````````````````');
    }
});