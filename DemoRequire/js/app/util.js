/**
 * Created by xuds on 2016/1/12.
 * 浏览器特性检查
 */
define(function(){
    return {
        //异步加载css文件
        loadStyleSheet:function(url){
            $("head").append($("<link>",{
                rel:"stylesheet",
                type:"text/css",
                href:url
            }));
        }
    }
});