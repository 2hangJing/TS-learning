<template>
    <div>
        <h3> this is class </h3>
        
    </div>
    <h2>{{ aaa }}</h2>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        data(){
            return{
                aaa: 50
            }
        },
        mounted(){
            // this.aaa;
        },
        setup(){
            console.log('```````````` class `````````````````');
            class First {
                public name: string;
                //  私有属性只可以本类访问
                private age: number;
                //  受保护属性子类可以访问、修改，外部不允许访问
                protected height: number;
                public constructor(name: string, height: number){
                    this.age = 25;
                    this.name = name;
                    this.height = height;
                }
                public getName(): string{
                    return this.name;
                }
            }

            class Second extends First{
                constructor(name: string, height: number) {
                    super(name, height);
                    //  报错、私有属性 子类无法访问
                    // console.log('private age', this.age);
                    //  子类可以访问 基类 的 protected 属性
                    console.log('protected height', this.height);
                }
            }

            let firstClass = new First(' first ts class', 180);
            let secondClass = new Second(' protected', 160);
            console.log('getName', firstClass.getName());
            // 外部无法读 protected、private 的属性
            // console.log('age', firstClass.age);

            //  protected constructor 的类无法呗实例化，但是其子类可以
            class  Three {
                public str: string;
                protected constructor(str: string) {
                    this.str = str;
                }
            }
            // console.log('protected constructor', new Three('protected'));
            
            //  readonly修饰符，只读
            class Four {
                readonly name: string = 'Four';
                //  参数属性，必须含有修饰符
                public constructor(public age: number){
                    //  参数属性免去赋值操作，简练语法
                    // this.age = age;
                }
            }
            let fourClass = new Four(18);
            console.log('name 初始化赋值', fourClass.name);
            console.log('参数属性，直接赋值', fourClass.age);
            //  readonly name 可以读取不允许赋值
            // fourClass.name = 'new Name';

            //  存取器材
            class Five {
                get className(): string{
                    return this._className;
                }

                set className(newStr: string){
                    console.log('触发 set className:', newStr);
                    this._className = newStr + ' set ';
                }
                constructor(public _className: string){}
            }
            let fiveClass = new Five('任何名字');
            fiveClass.className = 'five class className';
            console.log('触发 get className:', fiveClass.className);
            

            //  静态属性
            class Six {
                static sixName: string = 'six';
                public name: string;
                constructor() {
                    this.name = Six.sixName;
                }
            }
            let sixClass = new Six();
            console.log('静态属性:', sixClass.name);
            console.log('静态属性2:', Six.name);
            
            //  抽象类，像具体的接口实现
            abstract class Seven {
                //  抽象方法
                abstract getName(): void;
            }

            class SevenExtends extends Seven {
                //  子类必须实现抽象类中得抽象方法
                getName(): string{
                    return 'Seven';
                }
            }
            //  抽象类无法被实例化
            // let sevenClass = new Seven();
            //  派生类、子类 可以。
            let sevenExtendsClass = new SevenExtends();

            // implements 与 extends 区别
            // implements
            // 实现，一个新的类，从父类或者接口实现所有的属性和方法，但是不是子类
            // extends
            // 继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法
            interface implementsInterface {
                name: string;
                age: string;
            };
            class implementsClass implements implementsInterface{
                name: string;
                age: string;
                constructor(){
                    this.name = '10';
                    this.age = '20';
                }
            }
            
        }
    })
</script>
<style lang='scss'>

</style>