/**
 * Created by xuds on 2016/4/13.
 */
/*if (typeof define === "function" && define.cmd) {
    console.log("有 Sea.js 等 CMD 模块加载器存在");
}*/
define(function(require){
    var a=null;
    var data=require("./data");
    var widget=require("./widget");
    widget.doSomething();
    a=widget.do.getA();
    console.log(a);
    widget.do.setA(14);
    a=widget.do.getA();
    console.log(a);
    var h=require("./f");
});