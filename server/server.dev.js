/*
 * @Author: monai
 * @Date: 2019-11-26 15:00:11
 * @LastEditors: monai
 * @LastEditTime: 2021-01-08 14:36:12
 */
const path                      = require('path');
const webpack                   = require("webpack");
const express                   = require("express");
const colors                    = require('colors');
const webpackHotMiddleware      = require("webpack-hot-middleware");
const webpackDevMiddleware      = require("webpack-dev-middleware");
const proxy                     = require('http-proxy-middleware');

const config                    = require("../webpackConfig/webpack.configDev");
const base                      = require('../config/base');
const tool                      = require('../static/library/serverTool');

server = express();

//  webpackHotMiddleware 实现浏览器刷新
for(let i in config.entry)config.entry[i].push(path.resolve(__dirname, "./server.dev.hotReload.js"));

let compiler = webpack(config);
let hotComplier = webpackHotMiddleware(compiler, { reload: true});
let devComplier = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'error',
    logTime: true,
    //  docker 中webpack 无法监听主机硬盘代码变动，可以加此处轮询，代替文件监听系统
    // watchOptions: {poll: 1000}
});

//  webpackDevMiddleware 编译成功后回掉打开 url
devComplier.waitUntilValid(() => { 
    
    console.log( colors.green(`> 已监听以下项目：`) )

    Object.keys(tool.entryList.entryHtml).forEach((val, index) =>{

        //  只打开第一个遍历得模板，并且开启自动打开
        index == 0 && base.autoOpen && tool.open(`http://localhost:${base.devPort}/${val}.html`)

        console.log( colors.green(`> http://localhost:${base.devPort}/${val}.html`) )
    });
});

// 添加 proxy 
Object.keys(base.proxy).forEach(val =>{ server.use(val, proxy(base.proxy[val])) });

server.use(devComplier);

// webpackHotMiddleware 浏览器刷新配置 
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {  
    hotComplier.publish({ action: 'reload' });  
});

// webpackHotMiddleware 浏览器刷新配置
server.use(hotComplier);

server.listen(base.devPort, ()=>{ console.log( colors.green(`> node service listen port: ${base.devPort}`) ); })


// eventSource 浏览器刷新
// let isReload = false;
// compiler.hooks.emit.tap("Reload", (compilation) => {

//     isReload = true;
// })

// eventSource 浏览器刷新
// server.get('/webpackReload', (req, res)=>{

//     let timerId;

//     res.set({
//         'Connection': 'keep-alive',
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache'
//     })

//     res.write('event: open\n');
//     res.write('data: reload connact!');
//     res.flushHeaders();

//     timerId = setInterval(()=>{

//         res.write('event: message\n');
//         res.write(`data: ${isReload}\n\n`);
//         res.flushHeaders();
//         isReload && (isReload = false)
//     }, 1000)

//     req.connection.on('close', function () {

//         clearInterval(timerId);
//     });
// });