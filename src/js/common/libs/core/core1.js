/**
 * Created by kevinzjyu on 14-8-14.
 */
define(function(){
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