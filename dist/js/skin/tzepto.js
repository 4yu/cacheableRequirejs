define("skin/tzepto",['component/comp1','zepto'],function(comp1,zp){
    console.log("index");
    console.log(zp);
    zp("#test").html("i am zepto")
});