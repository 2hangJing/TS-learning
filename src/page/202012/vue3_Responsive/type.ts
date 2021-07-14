/*
 * @Author: monai
 * @Date: 2021-07-14 18:00:02
 * @LastEditors: monai
 * @LastEditTime: 2021-07-14 18:27:11
 */
export interface TYPE_effectOptions {
    lazy: boolean;
    scheduler?: (func: Function)=>void
} 

export interface TYPE_effect {
    (): void;
    options: TYPE_effectOptions;
}