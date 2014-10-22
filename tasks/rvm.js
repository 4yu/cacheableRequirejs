/*
 * grunt-rv
 * https://github.com/cbas/grunt-rvm
 *
 * Copyright (c) 2014 kevinzjyu
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    http = require("http");

module.exports = function (grunt) {

    function md5(filepath, algorithm, encoding, fileEncoding) {
        var hash = crypto.createHash(algorithm);
        hash.update(grunt.file.read(filepath), fileEncoding);
        return hash.digest(encoding);
    }

    grunt.registerMultiTask('rvm', '版本管理工具', function () {
        this.async();
        var options = this.options({
            encoding: 'utf8',
            algorithm: 'md5',
            length: 8
        });
        var mVersioned = {},fProcessed = {};
        var modulePrefix = grunt.config("requirejs.compile.options.dir")
            +"/"+grunt.config("requirejs.compile.options.baseUrl")+"/";
        var paths = grunt.config("requirejs.compile.options.paths");

        //获取版本号
        this.files.forEach(function (filePair) {
            filePair.src.forEach(function (filePath) {
                var hash = md5(filePath, options.algorithm, 'hex', options.encoding),
                    verCode = hash.slice(0, options.length);
                //model名算法
                var moduleName = filePath.replace(modulePrefix, "");
                for (var props in paths) {
                    if (paths.hasOwnProperty(props)) {
                        if (moduleName.indexOf(paths[props]) > -1) {
                            moduleName = moduleName.replace(paths[props], props);
                            break;
                        }
                    }
                }
                moduleName = moduleName.replace(/\.js/i, "");
                mVersioned[moduleName] = verCode;
                fProcessed[moduleName] = filePath;
            });
        });
        //替换版本号、paths、modules
        var temp = grunt.file.read(options.verTmpl),
            modules = grunt.config("requirejs.compile.options.modules"),
        shim = grunt.config("requirejs.compile.options.shim") || {};
        modules = modules ? modules:[];
        modules.forEach(function(m){
            if(m.hasOwnProperty("create")){
                delete m.create;
            }
            if(m.hasOwnProperty("exclude")){
                delete m.exclude;
            }
        });
        var strcontent = temp.replace("jsVersionInfoPadding",JSON.stringify(mVersioned))
            .replace("requirePathsPadding",JSON.stringify(paths))
            .replace('requireShimPadding',JSON.stringify(shim))
            .replace("modulesPadding",JSON.stringify(modules));
        grunt.file.write(options.verOutput, strcontent);
    });

};