

const path          = require('path');
const webpack       = require("webpack");
const express       = require("express");
const colors        = require('colors');
const ora           = require('ora');

const config        = require("../webpackConfig/webpack.configBuild");
const tool          = require('../static/library/serverTool');

server = express();

console.log(colors.green('> start building'));

const spinner = ora({ text: 'build ...\n'});
spinner.start();

webpack(config, (err, stats)=>{
    const info = stats.toJson();

    if(err) throw err;

    if (stats.hasErrors()) console.log(colors.red('errors：\n'), colors.red(info.errors));
    
    if (stats.hasWarnings()) console.log(colors.yellow('warnings：\n'),colors.yellow(info.warnings));

    spinner.stop();

    console.log(colors.green('> build complete'));
});
