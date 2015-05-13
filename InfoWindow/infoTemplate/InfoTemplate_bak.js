define(["require", "dijit/_WidgetBase", "dojo/_base/window", "dojo/_base/declare",
    "dojo/dom-construct", "dojo/dom-class", "dojo/query", "dojo/ready", "dojo/_base/array",
    "esri/InfoTemplate"], function (require, _WidgetBase, window, declare, domConstruct, domClass, query, ready, array, InfoTemplate) {
    return declare([_WidgetBase, InfoTemplate], {
        cssPath: require.toUrl("./css/infoTemplate.css"),
        themeArray: ["default", "primary", "success", "info", "warning", "danger"],
        theme: "info",
        constructor: function (params) {
            declare.safeMixin(this, params);
            domConstruct.create("link", {
                rel: "stylesheet",
                type: "text/css",
                href: this.cssPath
            }, window.doc.head || window.doc.getElementsByTagName("head")[0]);
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
        }
    });
});