var require = {
    baseUrl: 'http://kevinzjyu-pc/requirejs/dist/js',
    paths: {"backbone":"common/backbone","jquery":"common/jquery","underscore":"common/underscore","zepto":"common/zepto","libs":"common/libs","component":"common/component"},
    shim: {"zepto":{"exports":"Zepto"}},
    waitSeconds: 30,
    verArgs:"max_age=31536000&rsVer="
};
var requirejsControls = {
    //模块版本
    jsVersions :{"backbone":"541b4cd6","common/base_tmpl":"35c22d09","common/bizcomm":"d4c0f26c","component/comp1":"79d355bb","component/comp2":"5b0b592c","jquery":"5b87c516","libs/core":"8dc83f0c","libs/core/core1":"a4841aa1","libs/core/core2":"c14d9d85","common/require":"cccc705b","underscore":"2a55a193","zepto":"a58da6d9","index":"946faf3b","skin/tbackbone":"f52f4138","skin/tzepto":"1404eda0"},
    //不支持缓存的模块，这些模块不是由define直接定义
    uncacheList :["jquery","zepto","underscore","backbone"],
    //触发加载大文件
    bigMatchs:[{"name":"common/bizcomm","include":["component/comp1","component/comp1"]},{"name":"libs/core","include":["libs/core/core1","libs/core/core2"]}]
};


var rsProfile = (function(){
    var jv = requirejsControls.jsVersions;
    function getVersion (name) {
        if (jv.hasOwnProperty(name)) {
            return jv[name];
        }
        return "";
    }
    function writeJS(url,attrs){
        if(attrs == undefined){
            attrs = "";
        }
        document.write('<script type="text/javascript"  src="'+url+'" '+attrs+' charset="utf-8" ></script>');
    }

    function writeRequireJs(main){
        var mainMod = "",url;
        url = "http://kevinzjyu-pc/requirejs/dist/js/common/require.js?max_age=31536000&rsVer="
            +getVersion("common/require");
        if(main){
            mainMod = ' data-main="'+main+'" ';
        }
        writeJS(url,mainMod);
    }
    return {
        writeRequireJs:writeRequireJs
    }
})();