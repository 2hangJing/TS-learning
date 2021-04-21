/*
 * @Author: monai
 * @Date: 2021-04-21 14:33:43
 * @LastEditors: monai
 * @LastEditTime: 2021-04-21 15:13:28
 */
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {}
    },
    mounted() {
        console.log('````````````````` enum start `````````````````');
        enum firstEnum { a,b=5,c,d=6 };
        console.log( 'firstEnum.a', firstEnum.a );

        enum stringEnum { a='a', b='b', c='c' };
        console.log( 'stringEnum.a', stringEnum.a );

        //  所有成员都是字面量时，枚举成员本身也成了类型，
        //  string 成员限制使用接口的变量只能为 当前成员本身
        // number成员不限制使用接口的变量具体数值，如下：
        // enum ShapKind { circle = 20, square = 30 };
        // interface cricle {
        //     kind: ShapKind.circle
        // }
        // let c: cricle = {
        //     ShapKind.circle为20，但是此处为30也允许，string只能是 kind: ShapKind.circle，其他字符串报错
        //     kind: 30
        // }

        //  反响映射
        enum reverseMappingsEnum { a, b };
        let a:reverseMappingsEnum = reverseMappingsEnum.a;
        let key: string = reverseMappingsEnum[a];
        console.log( 'reverseMappingsEnum:', key );
    

        console.log('````````````````` enum end `````````````````');
    }
});