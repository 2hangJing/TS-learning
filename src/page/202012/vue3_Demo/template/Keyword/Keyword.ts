/*
 * @Author: monai
 * @Date: 2021-05-26 09:54:42
 * @LastEditors: monai
 * @LastEditTime: 2021-05-26 14:50:01
 */
import { defineComponent, readonly } from 'vue';

export default defineComponent({
    data() {
        return {}
    },
    mounted() {
        console.log('````````````````` Keyword start `````````````````');
        console.log( '\n', '******** extends ********' );
        console.log( 'extends 关键字，A extends B=>原理：判断A类型实例是否能赋值给B类型实例。满足类型兼容，也就是协变' );
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

        console.log( '\n', '******** infer 暂定 ********' );
 

        console.log('````````````````` Keyword end `````````````````');
    }
});