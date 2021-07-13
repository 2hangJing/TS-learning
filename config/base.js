const path = require('path');
const dev = require('./dev');
const build_dev = require('./build_dev');
let ENV_CONFIG = {};

//  糅合当前环境配置项
switch(process.argv[2]){

    case 'develoap':
        ENV_CONFIG = dev;
        break;
    case 'build_dev':
        ENV_CONFIG = build_dev;
        break;
}

module.exports = Object.assign({
    //  src 目录绝对路劲
    srcPath: path.resolve(__dirname, '../src'),
    //  打包生成的文件名称
    buildName: 'dist',
    //  图片打包文件夹名称
    buildImg: 'img',
    //  字体打包文件夹名称
    buildFont: 'font',
    //  javascript打包文件夹名称
    buildJS: 'js',
    //  css 打包文件夹名称
    buildCSS: 'css',
    //  本地开发端口
    devPort: 3000,
    //  当前开发环境
    ENV: process.argv[2],
    //  是否开启自动打开浏览器
    autoOpen: false,
    //  需要打包、本地开发启动的文件路径正则, 空数组代表全部
    includeProject: [
        /202012\/vue3_Demo/,
        /vue3_Responsive/
    ]
}, ENV_CONFIG);