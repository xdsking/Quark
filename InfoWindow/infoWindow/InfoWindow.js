/**
 * Created by Administrator on 2015/3/13.
 */
define(["require", "dijit/_WidgetBase", "dojo/_base/window", "dojo/_base/declare",
    "dojo/dom-construct", "dojo/dom-class", "dojo/query", "dojo/ready", "dojo/_base/array"], function (require, _WidgetBase, window, declare, domConstruct, domClass, query, ready, array) {
    var cssFlag=false;
    return declare([_WidgetBase], {
        cssPath: require.toUrl("./css/infoWindow.css"),
        themeArray: ["default", "primary", "success", "info", "warning", "danger"],
        theme: "info",
        constructor: function (params) {
            declare.safeMixin(this, params);
            if(!cssFlag){
                domConstruct.create("link", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: this.cssPath
                }, window.doc.head || window.doc.getElementsByTagName("head")[0]);
                cssFlag=true;
            }
            this._addClassByTheme();
        },
        /**
         * 根据theme类型 添加样式类
         * @private
         */
        _addClassByTheme: function () {
            var self = this;
            ready(function () {
                var infoWindowNodes = query(".esriPopup .titlePane");
                var className = self._getclassNodeByTheme();
                array.forEach(infoWindowNodes, function (infoWindowNode) {
                    domClass.add(infoWindowNode, className);
                });
            });
        },
        /**
         *
         * @returns {string} 根据theme 类型获取className参数
         * @private
         */
        _getclassNodeByTheme: function () {
            var className = "";
            switch (this.theme) {
                case "default":
                    className = "titlePane-default";
                    break;
                case "primary":
                    className = "titlePane-primary";
                    break;
                case "success":
                    className = "titlePane-success";
                    break;
                case "info":
                    className = "titlePane-info";
                    break;
                case "warning":
                    className = "titlePane-warning";
                    break;
                case "danger":
                    className = "titlePane-danger";
                    break;
                default :
                    className = "titlePane-info";

            }
            return className;
        },
        /**
         * 当content为对象时,自定义构造infoWindow表单
         * @param content
         * @private
         */
        getContent:function(content){
            var infoWindowForm=domConstruct.create("table",{"class":"infoWindow-form"});
            for(var name in content){
                var value=content[name+""];
                var infoWindowGroup=domConstruct.create("tr",{"class":"infoWindow-group"});
                var itemLabel=domConstruct.create("td",
                    {
                        "class":"info-label",
                        "innerHTML":name+"："
                    });
                var itemValue=domConstruct.create("td",
                    {
                        "class":"info-value",
                        "innerHTML":value||"",
                        "title":value||""
                    });
                infoWindowGroup.appendChild(itemLabel);
                infoWindowGroup.appendChild(itemValue);
                infoWindowForm.appendChild(infoWindowGroup);
            }
            return infoWindowForm;
        }
    });
});