define("index",['component/comp1','jquery'],function(cmp1,jq){
    console.log("index");
cmp1.show();
    console.log(jq("#test").html());
});