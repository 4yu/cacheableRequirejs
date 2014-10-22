module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    appDir: 'src',//源码目录
                    dir: 'dist',//构建目标目录
                    keepBuildDir: false,//是否保留原目标目录（先删后创建）
                    baseUrl: 'js',//模块名起始目录（不包含），例如dist/js/skin/index.js，模块名将为skin/index
                    paths: {
                    'backbone':'common/backbone',
                        'jquery':'common/jquery',
                     'underscore':'common/underscore',
                        'zepto':'common/zepto',
                    'libs': 'common/libs',
                        'component': 'common/component'
                    },
                    shim:{
                        'zepto':{exports:'Zepto'}
                    },
                    //打包库
                    modules: [
                        {name: 'common/bizcomm', create: true,
                            include: ["component/comp1", "component/comp1"], exclude: ["jquery","underscore", "libs/core"]},
                        {name: 'libs/core', create: true, include: ["libs/core/core1", "libs/core/core2"],
                            exclude: ["underscore","jquery"]}
                    ],
                    optimize: "none",//default is "uglify"
                    baseUrlCopy: '<%= requirejs.compile.options.baseUrl%>',//上面的baseUrl 会被运行时重写，保留原始值复用
                    onBuildWrite: function (moduleName, path, contents) {
                        //为单文件加上模块名
                        var stModName, isDefinded = false,
                            prefix = this.baseUrlCopy;
                        //打包的文件，就别折腾了
                        if (this.modules) {
                            for (var i = 0, len = this.modules.length; i < len; i = i + 1) {
                                for (var j = 0, lenj = this.modules[i].include.length; j < lenj; j++) {
                                    if (this.modules[i].include[j] == moduleName) {
                                        isDefinded = true;
                                        break;
                                    }
                                }
                            }
                        }
                        //未自定义
                        if (!isDefinded && moduleName.indexOf("/require") == -1) {
                            //modName算法，去掉baseUrl，再与paths匹配替换。
                            stModName = moduleName.substr(prefix.length);
                            if (this.paths) {
                                for (var prop in this.paths) {
                                    if (this.paths.hasOwnProperty(prop)) {
                                        stModName = stModName.replace(
                                            this.paths[prop].replace(this.baseUrl, "")
                                            , prop);
                                    }
                                }
                            }
                            while (stModName.charAt(0) == '/') {
                                stModName = stModName.substr(1);
                            }
                            //原则是一个文件中只有一个define
                            var match = contents.match(/define\s*\((\s*["'][\s\S]*?["'])?\s*[\,]?\s*(\[[\s\S]*?\])?/);
                            if (match) {
                                if (!match[1]) {//没有显式定义模块名
                                    stModName = "\"" + stModName + "\",";
                                    if (!match[2])//没有显式定义依赖
                                    {
                                        stModName = stModName + "[],";
                                    }

                                    try {
                                        contents = contents.replace(/define\s*?\(/, "define(" + stModName);
                                    }
                                    catch (ex) {
                                        grunt.log.writeln("err:" + ex);
                                    }
                                }
                            }
                        }
                        return contents;
                    }
                }
            }
        },
        rvm: {
            custom_options: {
                //处理的文件
                src: ['<%= requirejs.compile.options.dir%>/<%= requirejs.compile.options.baseUrl%>/**/*.js'],
                options: {
                    algorithm: 'sha1',//算法，还支持MD5
                    length: 8,//版本号长度
                    verTmpl: "dist/js/common/base_tmpl.js",//base.js模板
                    verOutput: "dist/js/common/base.js"//base.js的输出
                }
            }
        }
    });
    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    // resgister tasks
    grunt.registerTask('default', ['requirejs', 'rvm']);
};