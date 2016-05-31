/**
 * Created by xuds on 2016/1/12.
 */
define(function(){
    var array1=[];//静态参数
    return {
        name: "ys",
        age: 24,
        push:function(a){
            array1.push(a);
        },
        getArray:function(){
            return array1;
        },
        pop:function(){
            array1.pop();
        }
    }
});