/*
 * @Author: monai
 * @Date: 2019-11-27 09:39:50
 * @LastEditors: monai
 * @LastEditTime: 2021-02-22 15:28:51
 */
const c         = require('child_process');
const glob      = require("glob");
const path      = require('path');
const base      = require('../../config/base');

let tool = {
    //  缓存路径数据
    entryList: {},

    init(){
        
        this.getEntryList();
    },
    open(url){
        c.exec(`start ${ url }`);
    },
    getEntryList(){

        let entryJS = {}, entryHtml = {}, list = base.includeProject,
            files = glob.sync("src/page/**/*(index.html|main.ts)");
        let includeProject = list.length && files.reduce((total, filePath)=> ( list.some(val=> val.test(filePath)) && total.push(filePath), total ), []) || files;

        for(let val of includeProject){

            let pathSplit = val.split('/').slice(1),
                key = pathSplit.slice(1,3).join('_');

            (val.endsWith('ts') ? entryJS : entryHtml)[key] = [path.resolve(base.srcPath, pathSplit.join(path.sep))];
        }
        this.entryList =  {entryJS, entryHtml};
    }
};

tool.init();

module.exports = tool;