define(["dojo/_base/declare",
    "dojo/dom",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./Widget1.html",
    "../widget2/Widget2"
],function(
    declare,
    dom,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,Widget2){
    return declare([_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{
        templateString:template,
        baseClass:"Widget1",
        constructor:function(){

        },
        postCreate:function(){
            var widget2=new Widget2();
            widget2.placeAt(this.widgetContainer);
        }
    });

});