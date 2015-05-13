define(["dojo/_base/declare",
        "dojo/_base/window",
        "dojo/_base/lang",
        "require",
        "dojo/dom-construct",
        "dijit/Dialog",
        "dijit/form/Button"

],function(declare,window,lang,require,domConstruct,Dialog){
    return declare([Dialog],{
        cssPath:require.toUrl("./css/MyDialog.css"),
        baseClass:"MyDialog",
        title:"提示窗口",
        isAutoClose:false,
        closeTime:5000,
        style:{height:"100px",width:"300px"},
        content:"用户已退出视频会议房间...",
        constructor:function(){
            domConstruct.create("link",{
                rel:"stylesheet",
                type:"text/css",
                href:this.cssPath
            },window.doc.head);
        },
        initDialogContent:function(){

        },
        postCreate:function(){
            this.initDialogContent();
        },
        startup:function(){
            var self=this;
            this.inherited(arguments);
            if(this.isAutoClose){
                setTimeout(function(){
                    self.hide();
                },self.closeTime);
            }
        },
        hide:function(){
            this.inherited(arguments);
            this.destroy();
        }
});
});
