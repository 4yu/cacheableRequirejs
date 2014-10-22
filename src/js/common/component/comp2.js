/**
 * Created by kevinzjyu on 14-8-14.
 */
define(["jquery","libs/core/core2"],function(jq,c2){
        var  info = "i am comp2";
        return {
            show:function(){
                console.log(info+",and core2 say:"+c2.get());
            },
            get:function(){
                return info;
            }
        }
    }
);