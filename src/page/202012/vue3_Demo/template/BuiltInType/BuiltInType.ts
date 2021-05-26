/*
 * @Author: monai
 * @Date: 2021-05-26 14:55:40
 * @LastEditors: monai
 * @LastEditTime: 2021-05-26 18:37:01
 */
import { defineComponent, readonly } from 'vue';

export default defineComponent({
    data() {
        return {}
    },
    mounted() {
        console.log('````````````````` 内置类型 start `````````````````');
        console.log( '\n', '******** Partial ********' );
        console.log( 'Partial 的作用就是可以将某个类型里的属性全部变为可选项 ?。' );
        // node_modules/typescript/lib/lib.es5.d.ts
        // type Partial<T> = {
        //     [P in keyof T]?: T[P];
        // };
        type typePartial1 = { name: string; };
        type typePartial2 = Partial<typePartial1>;

        console.log( '\n', '******** Required ********' );
        console.log( 'Required 是将所有类型改成必选项。' );
        // node_modules/typescript/lib/lib.es5.d.ts
        // type Required<T> = {
        //     [P in keyof T]-?: T[P];
        // };
        // -? 表示去除 ? 修饰符，同样可以使用在 readonly 修饰符上，去除只读。
        type typeRequired1 = { name?: string; };
        type typeRequired2 = Required<typeRequired1>;

        console.log( '\n', '******** Readonly ********' );
        console.log( 'Partial 将传入的属性变为只读选项。' );
        // node_modules/typescript/lib/lib.es5.d.ts
        // type Readonly<T> = {
        //     readonly [P in keyof T]: T[P];
        // };
        type typeReadonly1 = { name: string; };
        type typeReadonly2 = Readonly<typeReadonly1>;

        console.log( '\n', '******** Pick ********' );
        console.log( 'Pick 将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型' );
        // node_modules/typescript/lib/lib.es5.d.ts
        // type Pick<T, K extends keyof T> = {
        //     [P in K]: T[P];
        // };
        type typePick1 = { name: string; age: number };
        type typePick2 = Pick<typePick1, 'name'>;

        console.log( '\n', '******** Record ********' );
        console.log( 'Record<K, T> 生成一个新类型，K 为某个类型所有 Key 的联合类型，并且将其属性转化为 T 类型。' );
        // node_modules/typescript/lib/lib.es5.d.ts
        // type Record<K extends keyof any, T> = {
        //     [P in K]: T;
        // };
        type typeRecord1 = { name: string; age: number };
        type typeRecord2 = Record<keyof typeRecord1, boolean>;


        console.log('````````````````` Keyword end `````````````````');
    }
});