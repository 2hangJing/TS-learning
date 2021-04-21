<template>
    <div>
        <h1>ts 测试</h1>
        <h2>{{ textTransform }}</h2>
        <button @click="routerFunc('class')">跳转 class</button>
        <button @click="routerFunc('function')">跳转 function</button>
        <button @click="routerFunc('generics')">跳转 generics</button>
        <button @click="routerFunc('enum')">跳转 enum</button>
        <button @click="routerFunc('typeCompatibility')">跳转 typeCompatibility</button>
        <router-view></router-view>
    </div>
</template>
<script lang='ts'>
    import { defineComponent } from 'vue';
    interface dataUserInfo {
        name: string;
        age: number
        sex?: string
    }
    export default defineComponent({
        data(){
            return {
                userInfo:{
                    name: 'zhang san',
                    age: 0,
                    sex: 'man'
                } as dataUserInfo
            }
        },
        computed:{
            textTransform(): string{
                return 'name: ' + this.userInfo.name;
            }
        },
        created(){
            let boo: boolean = false;
            let num: number = 1;
            let str: string = 'str';
            let arr1: number[] = [1,2,3];
            let arr2: Array<number> = [1,2,3];
            let arr3: any[] = [1, true, '2'];
            //  数组只读
            let arr4: ReadonlyArray<any> = [6,6,6,];
            let arr5: any[] = [999];
            //  类型断言解决 只读数组无法 赋值
            arr5 = arr4 as number[];
            console.log('arr5', arr5);
            //  元组 Tuple
            let tuple: [string, number] = ['1', 2];
            //  枚举
            enum enumList { a1 = 2, a2, a3 };
            let enumValue = enumList[2];
            console.log( 'enumList.a1', enumList.a1 );
            
            //  void
            let unusable: void = undefined;
            function unusableFunc(): void{
                console.log('void', '没有返回值');
            }
            unusableFunc();
            console.log('unusable', unusable);
            
            // never 总是错误或者无法返回，比如死循环
            // function neverFunc(): never{
            //     throw new Error('never error');
            // }
            // neverFunc();

            //  类型断言 as 写法
            let typeAssertionStr1 = 'typeAssertionStr1';
            //  确定为 string
            console.log( 'typeAssertionStr1 length', (typeAssertionStr1 as string).length );
            //  类型断言 <> 写法
            let typeAssertionStr2 = { name: 'typeAssertionStr2' };
            //  确定为 string
            console.log( 'typeAssertionStr2 length', (<string>typeAssertionStr2.name).length );
            
            //  接口
            enum EenumLearning { 'a', 'b', 'c' = 6 };
            interface LearningInterface {
                readonly a1: string;
                a2: number;
                a3?: boolean;
                //  不能更改引用
                readonly a4: any[];
                //  完全不能修改，包括一些 Push 函数等
                a44: ReadonlyArray<any>;
                a5: EenumLearning;
            };
            let learning: LearningInterface = { a1: 'a1', a2: 2, a4: [666], a44: [999], a5: EenumLearning.a };
            console.log( 'learning', learning );

            //  type 接口
            type studyType = boolean;
            let study: studyType = true;
            console.log( 'study', study );
            //  接口 一些实例
            /************  1 ************/ 
            // interface ccInterface {
            //     color?: string;
            //     width: number
            // }
            // function cc( parameter: ccInterface): {width: number}{
            //     console.log('parameter', parameter?.color);
                
            //     return { width: parameter.width };
            // }
            // //  通过 as 类型断言解决参数名不在 接口中
            // console.log( 'cc(10)', cc({width: 10, color1: 'red'} as ccInterface) );
            
            /************  2 ************/ 
            // interface ccInterface {
            //     color?: string;
            //     width: number;
            //     //  通过 字符串索引签名 解决 参数名不在接口中定义的额外属性报错
            //     //  propsName 索引签名
            //     //  string 缩影类型
            //     //  any 索引类型返回值类型
            //     [propsName: string]: any
            // }
            // function cc( parameter: ccInterface): {width: number}{
            //     console.log('parameter', parameter?.color);
                
            //     return { width: parameter.width };
            // }
            // console.log( 'cc(10)', cc({width: 10, color1: 'red'}) );

            /************ 3 函数类型 ************/ 
            // interface ccFuncInterface {
            //     (color: string, width: number): boolean;
            // }
            // //  函数参数是按顺序检查是否与接口中相应位置参数类型的，允许函数参数名与接口定义中不同
            // let ccFuncLet: ccFuncInterface = function(color1, width){
            //     return width > 5;
            // }
            // console.log('ccFuncLet', ccFuncLet('', 10));

            /************ 4 接口继承 ************/ 
            // interface ccInterface1 {
            //     color: string
            // }
            // interface ccInterface2 {
            //     age: number
            // }
            // interface ccInterface3 extends ccInterface1, ccInterface2 {
            //     sex: string
            // }

            // let objInterface = {
            //     color: 'red';
            //     age: 24;
            //     // sex: '男'
            // } as ccInterface3;

            // console.log( 'objInterface', objInterface );

            /************ 4 混合类型 ************/ 
            interface ccInterface {
                (name: string): string;
                color: string;
            }

            function ccFuncInterface(): ccInterface{
                let obj = function (name: string): string{ return 'name:' + name; } as ccInterface;
                obj.color = 'red';
                return obj;
            }

            console.log('objInterface', ccFuncInterface()('混合接口'));
        },
        methods:{
            routerFunc(routerName: string): void{
                
                this['$router'].push(routerName);
            }
        }
    })
</script>
<style lang='scss'>
    @import './scss/app.scss';
</style>