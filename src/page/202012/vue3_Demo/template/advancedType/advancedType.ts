/*
 * @Author: monai
 * @Date: 2021-04-25 09:51:42
 * @LastEditors: monai
 * @LastEditTime: 2021-04-25 10:09:11
 */
import { defineComponent } from 'vue';

//  高级类型
export default defineComponent({
    mounted() {
        console.log('````````````````` advancedType start `````````````````');
        // 1. 交叉类型 intersection types
        interface intersectionTypes1 {
            name: string
        }
        interface intersectionTypes2 {
            age: number
        }
        let intersectionVar: intersectionTypes1 & intersectionTypes2 = {
            name: 'intersectionVar',
            age: 99
        };
        console.log( 'intersection type 交叉类型：', intersectionVar );

        // 2. 联合类型 union type
        interface unionTypes1 {
            name: string
        }
        interface unionTypes2 {
            age: number
        }
        let unionVar: unionTypes1 | unionTypes2 = {
            name: 'unionVar'
        };
        console.log( unionVar.name );
        

        console.log('````````````````` advancedType end `````````````````');
    }
});