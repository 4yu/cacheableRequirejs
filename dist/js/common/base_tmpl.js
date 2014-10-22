var require = {
    baseUrl: 'http://kevinzjyu-pc/requirejs/dist/js',
    paths: requirePathsPadding,
    shim: requireShimPadding,
    waitSeconds: 30,
    verArgs:"max_age=31536000&rsVer="
};
var requirejsControls = {
    //模块版本
    jsVersions :jsVersionInfoPadding,
    //不支持缓存的模块，这些模块不是由define直接定义
    uncacheList :["jquery","zepto","underscore","backbone"],
    //触发加载大文件
    bigMatchs:modulesPadding
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