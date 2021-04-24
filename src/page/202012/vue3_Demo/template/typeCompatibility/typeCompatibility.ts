/*
 * @Author: monai
 * @Date: 2021-04-21 15:45:12
 * @LastEditors: monai
 * @LastEditTime: 2021-04-24 14:58:51
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
        //  符合协变即可
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

        //  固定参数、可选参数、剩余参数
        //  ****************** 简单可以理解成 所有可选、剩余参数不存在即可 ******************
        let func1 = (x: number, y: number)=>{};
        // let func2 = (x?: number, y?: number, z?:number)=>{};
        // let func2 = (x: number, y: number, z?: number, ...arg)=>{};
        // func1 = func2;
        // let func3 = (y?: number, x?: number, z?: number)=>{};
        // let func4 = (y: number, x?: number)=>{};
        // func4 = func3;

        //  枚举，不同枚举之间不兼容
        //  number => 互相兼容
        enum numberEnum { a, b, c };
        let numberNum: number = 10;
        numberNum = numberEnum.a;
        console.log( 'number兼容数字枚举 numberNum：', numberNum );
        let numberEnumNum: numberEnum = numberEnum.a;
        numberEnumNum = 20;
        console.log( '数字枚举兼容number numberEnumNum', numberEnumNum );
        //  string string 兼容字符串枚举，相反不成立
        enum stringEnum { a='a', b='b' };
        let stringStr: string = 'stringStr';
        stringStr = stringEnum.a;
        let stringEnumStr: stringEnum = stringEnum.a;
        // stringEnumStr = '不兼容'
        console.log( 'string 兼容 string枚举 stringStr', stringStr );

        //  类，
        //  结构性兼容，属性方法满足协变规则 由父->子
        class class1 {
            public name: string;
            constructor (name: string ){
                this.name = name;
            }
        }
        class class2 {
            public name: string;
            public age: number;
            constructor (name: string, age ){
                this.name = name;
                this.age = age;
            }
        }
        let varClass1: class1 = new class1('class1');
        let varClass2: class2 = new class2('class2', 99);
        //  属性、方法 满足协变规范
        varClass1 = varClass2;
        //  私有、受保护的成员必须继承自同一个类，并且满足协变 由父->子
        class class3 {
            private className: string = 'class3';
            name: string = 'class3 name';
            constructor() {}
        }
        class class4 extends class3 {
            name: string = 'class4 name';
            constructor() {
                super();
            }
        }
        class class5 {
            private className: string = 'class5';
            name: string = 'class5 name';
            constructor() {}
        }
        let varClass3: class3 = new class3();
        let varClass4: class4 = new class4();
        let varClass5: class5 = new class5();
        varClass3 = varClass4;
        // 不兼容，private className 属性不是继承一个
        // varClass3 = varClass5;
        // 不兼容，理由同上
        // varClass5 = varClass4;

        //  泛型
        //  1. 类型参数未使用时被认为是 any，不会影响兼容性
        interface Type1<T>{}
        let generics1: Type1<string> = {};
        let generics2: Type1<number> = {};
        generics2 = generics1;
        generics1 = generics2;
        interface Type2<T>{
            name: T
        }
        let generics3: Type2<string> = {name: 'generics3'};
        let generics4: Type2<number> = {name: 4};
        //  不兼容
        // generics3 = generics4;
        // 泛型还未被实例化，在检查兼容性时会被类型参数转换为any：
        let generics5 = function <T>(x: T, name: string, age: number): void {};
        let generics6 = function <T>(x: T, name: string): void {};
        generics5 = generics6;


        console.log('````````````````` typeCompatibility end `````````````````');
    }
});