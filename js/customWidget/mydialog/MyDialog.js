define([
    "dojo/_base/declare",
    "dojo/_base/window",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "require",
    "dojo/dom-construct",
    "dojo/text!./MyDialog.html",
    "dijit/Dialog",
    "dijit/form/TextBox",//模板中声明式,也需引入;
    "dijit/form/Button"
], function (declare, window, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, require, domConstruct, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        cssPath: require.toUrl("./css/MyDialog.css"),
        baseClass: "MyDialog",
        title: "提示窗口",
        isAutoClose: false,
        closeTime: 5000,
        style: {height: "100px", width: "300px"},
        //content:"",
        constructor: function () {
            domConstruct.create("link", {
                rel: "stylesheet",
                type: "text/css",
                href: this.cssPath
            }, window.doc.head);
        },
        postCreate: function () {
            this.initMyDialog();
            this.MyDialog.show();
            on(this.cancel, "click", function () {
                alert();
            })
        },
        initMyDialog: function () {
            /*this.MyDialog.startup=function(){debugger;
             var self=this;
             this.inherited(arguments);
             if(true){
             setTimeout(function(){
             self.hide();
             },5000);
             };
             };
             this.MyDialog.hide=function(){
             this.inherited(arguments);
             this.destroy();
             };*/

        }
    });
});
