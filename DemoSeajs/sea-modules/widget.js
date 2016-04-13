/**
 * Created by xuds on 2016/4/13.
 */
define(function(require, exports, module){
    var a=11;
    // 对外提供 do 方法
    exports.doSomething=function(){
        console.log("方法被调用");
    };
    // 对外提供 do 对象
    exports.do={
        getA:function(){
            return a;
        },
        setA:function(value){
            a=value;
        }
    };
    // 通过module.exports
    /*module.exports = {
        foo: 'bar',
        doSomething: function() {}
    };*/
    // 通过 return 直接提供接口
    /*return {
        foo: 'bar',
        doSomething: function() {}
    };*/
});
//modules 中只能存在一个define，否则之前的会被覆盖；