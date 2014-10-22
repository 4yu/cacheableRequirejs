/**
 * Created by kevinzjyu on 14-8-14.
 */
define('libs/core/core1',[],function(){
        var  info = "i am core1,update";
        return {
            show:function(){
                console.log(info);
            },
            get:function(){
                return info;
            }
        }
    }
);
/**
 * Created by kevinzjyu on 14-8-14.
 */
define('libs/core/core2',["jquery","libs/core/core1"],function(jq,c1){
        var  info = "i am core2";
        return {
            show:function(){
                console.log(info+",and core1 say:"+c1.get());
            },
            get:function(){
                return info;
            }
        }
    }
);

define("libs/core", function(){});
