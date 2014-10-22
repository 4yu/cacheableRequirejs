/**
 * Created by kevinzjyu on 14-8-14.
 */
define(["jquery","libs/core/core1"],function(jq,c1){
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