<!--
 * @Author: monai
 * @Date: 2021-03-04 17:31:59
 * @LastEditors: monai
 * @LastEditTime: 2021-04-13 18:30:09
-->
<template>
    <div>
        <h3> this is function </h3>
        <h2>{{ num }}</h2>
        <button @click="buttonClickFunc">加法</button>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        setup(){
            console.log('```````````` function `````````````````');
            let func1: (age: number, name: string)=>object = function(age, name){
                return { age, name };
            };
            console.log( '完整函数类型', func1(18, 'zhang san'));
            
            //  ?: 可选参数，必须跟在必须参数后面
            function func2(age: number, name?: string): object{
                
                return { age };
            }
            console.log( '可选参数', func2(18));

            //  默认值，默认值可以在必须参数前面，调用时可以通过 undefined 使用默认值
            let func3 = function(height:number=18, age: number, name?: string): object{
                return { height, age }
            }
            console.log( '参数默认值', func3( undefined, 24 ));

            //  剩余参数，和 JS 一样
            function func4(age: number, ...others:string[]):object{
                interface customClass {
                    age: number;
                    name: string;
                }
                let obj: customClass = {
                    age,
                    name: others[0]
                }
                return obj;
            }
            console.log( '剩余参数', func4( 18, '张三' ));

            //  this 参数
            interface func5 {
                name: string,
                //  this: void 代表不需要 this
                getName: ()=>(this: void)=>string;
            }
            let func5Obj: func5 = {
                name: 'func5',
                //  this 参数：this参数是个假的参数，它出现在参数列表的最前面
                getName: function (this: func5){
                    return ()=>this.name;
                }
            }; 
            let func5GetName = func5Obj.getName();
            console.log( 'this 参数：', func5GetName());
            
            //  重载：重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
            function func6(num: string): string;
            function func6(num: number): number;
            function func6(num: string | number): string | number{
                let numType: string = typeof num;
                console.log(numType);
                
                if(numType == 'string'){
                    return '类型:' + num; 
                }
                else{
                    let addNum: number = Number(num) + 10;
                    return addNum;
                }
            }; 
            console.log('重载：', func6('string'));

            
        },
        data(){
            return{
                num: 0
            }
        },
        methods:{
            addFunc(type: string){
                if(type === 'add'){
                    this.num += 10;
                }else{
                    this.num += 20;
                }
            },
            buttonClickFunc():void{
                let type: string = 'e';
                this.addFunc(type);
            }
        }
    })
</script>
<style lang='scss'>

</style>