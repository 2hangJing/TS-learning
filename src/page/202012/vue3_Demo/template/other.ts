/*
 * @Author: monai
 * @Date: 2021-05-21 10:10:48
 * @LastEditors: monai
 * @LastEditTime: 2021-05-21 15:54:51
 */
import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        console.log('````````````````` other start `````````````````');
        console.log( 'extends 关键字，A extends B=>原理：判断A类型实例是否能赋值给B类型实例。满足类型兼容，也就是协变' );
        class extendsClass1 {
            public name: string = 'class1';
        }
        class extendsClass2 {
            public name: string = 'class2';
            public age: number = 2;
        }
        type extendsClassType<T> = T extends extendsClass1 ? extendsClass2: extendsClass1;
        type extendsClass =  extendsClassType<extendsClass2>;

        console.log( '根据类型推断，extendsClass 现在是 extendsClass2' );
        

        console.log('````````````````` other end `````````````````');
    }
});