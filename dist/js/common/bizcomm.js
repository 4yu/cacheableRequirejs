/**
 * Created by kevinzjyu on 14-8-14.
 */
define('component/comp1',["libs/core/core1"],function(jq,c1){
        var  info = "i am comp1";
        return {
            show:function(){
                console.log(info);
            },
            get:function(){
                return info;
            },
            set:function(msg){
                info = msg;
            },
            jq$:function(el){
                return jq.$(el);
            }
        };
    }
);

define("common/bizcomm", function(){});
