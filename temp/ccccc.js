/**
 * Created by xuds on 2015/10/9.
 */
(function () {
    Request = {
        getPrameter: getPrameter,
        getPrameterValues: getPrameterValues,
        setParam11:setParam1,
        性别:"男"
    };
    var param1={aa:11,bb:22};
    function getPrameter(){
        return param1;
    }
    function getPrameterValues(){
        return ""
    }
    function setParam1(aa,bb){
        param1.aa=aa;
        param1.bb=bb;
    }
}());