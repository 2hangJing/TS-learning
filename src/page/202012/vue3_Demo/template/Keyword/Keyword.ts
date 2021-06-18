/*
 * @Author: monai
 * @Date: 2021-05-26 09:54:42
 * @LastEditors: monai
 * @LastEditTime: 2021-06-18 18:34:12
 */
import { defineComponent, readonly } from 'vue';

export default defineComponent({
    data() {
        return {}
    },
    mounted() {
        console.log('````````````````` Keyword start `````````````````');
        console.log( '\n', '******** extends ********' );
        console.log( 'T extends U ? X : Y' );
        console.log( `
            T: checkedType 被检测类型
            U: extendsType 判断条件
            X: trueType 检测条件为true的结果类型
            Y: falseType 检测条件为false的结果类型`
        );
        console.log( 'extends 关键字，A extends B=>原理：判断A是否为B的子类（A、B 可以是类也可以是联合类型）。如果是类则满足类型兼容，也就是协变。' );
        //  官网解释：https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
        //  经典回答：https://stackoverflow.com/questions/55382306/typescript-distributive-conditional-types
        //  知乎解释：https://zhuanlan.zhihu.com/p/96046788
        class extendsClass1 {
            public name: string = 'class1';
        }
        class extendsClass2 {
            public name: string = 'class2';
            public age: number = 2;
        }
        type extendsClassType<T> = T extends extendsClass1 ? T: extendsClass1;
        type extendsClass =  extendsClassType<extendsClass2>;
        console.log( '根据类型推断，extendsClass 现在是 extendsClass2' );

        console.log( '\n', '******** extends: Distributive Conditional Types（分布式条件类型） ********' );
        console.log( `
            当 checkedType 同时满足：
            1. 泛型（generic type），且入参为 union type。
            2. 为 naked type（裸类型，意思是这个type没有被包裹在其他的复合结构里，如 array,、元组、record、function等）
        ` );
        //  符合 Distributive Conditional Types 类型 
        type distributive_success<T> = T extends number[] ? T: boolean[];
        type distributive_test1 = distributive_success<[1]|['2']>;

        //  不符合 Distributive Conditional Types 类型，因为 checkedType（T）被 [] 包裹（元组）起来了，不再是裸类型。
        type distributive_error1<T> = [T] extends number[] ? T: boolean[];
        type distributive_test2 = distributive_error1<1|'2'>;
        //  不符合 Distributive Conditional Types 类型，因为 checkedType（T）被Array包裹起来，不再是裸类型。
        type distributive_error2<T> = Array<T> extends number[] ? T: boolean[];
        type distributive_test3 = distributive_error2<1|'2'>;
        

        console.log( '\n', '******** typeof ********' );
        console.log( 'typeof TS中在基础功能上增加：获取变量的声明类型。' );
        let typeofLet1: number = 10;
        let typeofLet2: typeof typeofLet1;

        console.log( '\n', '******** keyof ********' );
        console.log( 'keyof 读取接口、类型 的所有key值。' );
        interface keyofInterface {
            name: string;
            age?: number;
            isKey: boolean;
        }
        let keyofObj = {
            key1: 'key1',
            100: 100
        };
        let keyofLet1: keyof keyofInterface; // 'name' 'age'
        // string number ，Obj key会将 Number 转为 string，所以此处可能是 string number，链接：
        // https://stackoverflow.com/questions/51808160/keyof-inferring-string-number-when-key-is-only-a-string
        let keyofLet2: keyof ({ [key: string]: string }); 
        let keyofLet3: keyof (typeof keyofObj); // key1 100
        
        console.log( '\n', '******** in ********' );
        console.log( 'in 遍历接口、类型的key联合类型（使用 keyof 获取key 联合类型），内部使用了 for .. in。' );
        interface inInterface {
            name: string;
            // age: 15;
            // isIn: boolean;
        };
        type readonlyInType = {readonly [key in keyof inInterface]: key};
        //  interface 不允许直接使用 in 添加 key: value，但是里面的属性可以使用。
        // 报错
        // interface readonlyInInInterface {readonly [key in keyof inInterface]: key}
        // 正常
        interface readonlyInInInterface {
            obj: {readonly [key in keyof inInterface]: key}
        }

        console.log( '\n', '******** infer ********' );
        console.log( 'infer 在类型判断（extends 表达式中）声明一个类型变量。' );
        console.log( 'infer 多个候选类型时逆变位置为交叉类型，协变位置为联合类型' );
        type typeInfer<T> = {a: T} extends { a: infer R }? { b: R }: {b: 'no match'};
        type inferEx = typeInfer<number>;
        //  逆变 Contravariance 时交叉类型
        //  原理：逆变位置需要满足 T 是父类，
        type inferContravariance<T> = ((arg: T)=>void) extends (arg: {a: infer R, b: infer R})=>void ? R: 'no match';
        type inferContravariance_1 = inferContravariance<{a: {num: number}, b: {class: string}}>;
        
        //  协变 covariant 时联合类型  
        //  原理：协变位置需要满足 T 是子类（ 也就是 {a: 'a1', b: 'b1'} 是 {a: infer R, b: infer R} 的子类），所以此条件的 R 最小范围值就是 a1 | b1。
        type inferCovariant<T> = T extends {a: infer R, b: infer R}? R: 'no match';
        type inferCovariant_1 = inferCovariant<{a: 'a1', b: 'b1'}>

        type test1 = {a: 'a1'|'b1'};
        type test2 = {a: 'a1', b: 'b1'};
        type test3 = test2 extends test1 ? true: false;

 

        console.log('````````````````` Keyword end `````````````````');
    }
});