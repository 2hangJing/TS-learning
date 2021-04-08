/*
 * @Author: monai
 * @Date: 2019-11-27 09:39:50
 * @LastEditors: monai
 * @LastEditTime: 2021-04-08 18:46:58
 */
const path                  = require('path');
const webpack               = require('webpack');
const { VueLoaderPlugin }   = require('vue-loader');
const htmlWebpackPlugin     = require('html-webpack-plugin');
const PreloadWebpackPlugin  = require('preload-webpack-plugin');

const tool                  = require('../static/library/serverTool');
const base                  = require('../config/base');

module.exports= {
    mode: "none",
    entry: tool.entryList.entryJS,
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, `../${ base.buildName }`)
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader'
            },{
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use:[{
                    loader: "file-loader",
                    options: {
                        outputPath: base.buildFont,
                        name: "[name].[hash].[ext]"
                    }
                }]
            },{
                test: /\.(png|jpg|gif|)$/,
                use:[{
                    loader: "url-loader",
                    options: {
                        //  图片输出到文件夹的路径，默认在 output.path 为根目录
                        outputPath: base.buildImg,

                        //  统一添加图片输出路径前得字符串，默认是 outputPath 的路径加图片名称
                        //  配置CDN时常用
                        // publicPath: 'http://cdn.micoworld.net/web/activity/',
                        name: "[name].[hash].[ext]",

                        //  5Kb 内文件 base64 内置
                        limit: 5*1024
                    }
                }]
            },{
                test: /.ts$/,
                use: [{
                    loader: ['babel-loader', 'ts-loader'],
                    options: {
                        appendTsSuffixTo: [/.vue$/],
                    }
                }]
            },{ 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [{
                    loader: "babel-loader",
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            axiosActivity$: path.resolve(__dirname, '../static/library/axiosActivity.js')
        }
    },
    plugins: [

        ...Object.entries(tool.entryList.entryHtml).map( filePath => {

            //  具体参数链接： https://juejin.im/post/5ce96ad7e51d455a2f2201e1
            return new htmlWebpackPlugin({
                filename: filePath[0] + '.html',
                template: filePath[1][0],
                inject: "body",
                minify: true,
                chunks: [filePath[0]]
            })
        }),
        
        //  异步chunk prefetch 加载优化 
        //  webpack v4 需要安装 preload-webpack-plugin@next
        //  链接：https://github.com/GoogleChromeLabs/preload-webpack-plugin
        // new PreloadWebpackPlugin({
        //     excludeHtmlNames: ['201911_test.html'],
        //     rel: "prefetch",
        //     as: "script"
        // }),

        //  shimming 垫片配置项
        //  https://webpack.docschina.org/guides/shimming/
        new webpack.ProvidePlugin({
            $: "jquery",
        }),

        //  vue plugin
        new VueLoaderPlugin(),

        //  全局参数传入
        new webpack.DefinePlugin({

            //  axios 打包、开发域名添加
            DOMAIN: JSON.stringify(base.DOMAIN)
        })
    ]
}