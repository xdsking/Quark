define([ "dojo/_base/declare", "require", "dojo/_base/config", "dojo/_base/lang", "dojo/_base/window", "dojox/layout/FloatingPane", "dojo/json",
        "dojo/dom-geometry", "dojo/dnd/move", "dojox/layout/Dock", "dojo/dom", "dojo/dom-style", "dojo/dom-construct", "dojo/dom-geometry"],
    function (declare, require, config, lang, window, FloatingPane, JSON, domGeometry, move, Dock, dom, domStyle, domConstruct, domGeom) {
        var ConstrainedFloatingPane = declare(FloatingPane, {
            params: null,
            closable: true,
            dockable: true,
            resizable: true,
            maxable: true,
            isflag: true,//用于表示调用show()之后,相对于父容器的定位有偏移的bug,会通过该关键字在resize方法中进行处理;
            duration: 400,
            dockTo: "dockBar",
            constrainedTo: "floatingPaneContainer",
            defaultStyle: {"z-index": 100, position: "absolute", padding: "1px 1px", height: "300px", width: "400px", left: "40px", top: "40px"/*,"border-color" :"gray","border-style":"outset"*/},
            srcNodeRef: null,
            constructor: function () {
                this._initFloatingPaneCss();
                this._initDockBar();
                //this._setMaxHeightAndMaxWidth();
            },
            postMixInProperties: function () {
                if (typeof this.style == "object") {
                    this.style = lang.mixin({}, this.defaultStyle, this.style);
                }
                var constrainedNode = dom.byId(this.constrainedTo);
                this.srcNodeRef = domConstruct.create("div", {"id": this.widgetId}, constrainedNode || window.doc.body);
            },
            _initDockBar: function () {
                if (!dom.byId(this.dockTo)) {
                    new Dock({id: this.dockTo}).placeAt(window.doc.body);
                    //domConstruct.create("div",{id:this.dockTo},window.doc.body);
                }
            },
            /**
             *  加载floatingPane的样式文件
             */
            _initFloatingPaneCss: function () {
                domConstruct.create("link", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: require.toUrl("./css/FloatingPane.css")
                }, window.doc.head);
            },
            /**
             * max-height与max-width属性
             */
            _setMaxHeightAndMaxWidth: function () {
                //获取浏览器大小，设置max-height与max-width属性
                var clientWidth = window.doc.body.clientWidth - 7;
                var clientHeight = window.doc.body.clientHeight - 2;
                this.style += "max-height:" + clientHeight + "px;max-width:" + clientWidth + "px;";
            },
            hide: function () {
                this.inherited(arguments);
            },
            /**
             *  覆盖父类的startup方法
             */
            startup: function () {
                this.isflag = false;
                this.inherited(arguments);
                var self = this;
                new move.constrainedMoveable(this.domNode, {
                    handle: this.focusNode,
                    constraints: function () {
                        var c = dom.byId(self.constrainedTo) || window.doc.body;
                        //var c=document.body;
                        var coordsWindow = {
                            l: 0,
                            t: 0,
                            w: c.clientWidth,// 范围设定为其容器的高宽
                            h: c.clientHeight
                        };
                        return coordsWindow;
                    },
                    within: true
                });
            },
            show: function () {
                this.isflag=false;
                this.inherited(arguments);
            },
            /**
             *
             * @param dim
             */
            resize: function (/* Object */dim) {
                if (!this.isflag) {
                    this.isflag = true;
                    return;
                }
                this.inherited(arguments);
            },

            destroy: function () {
                this.inherited(arguments);
            }
        });
        return ConstrainedFloatingPane;
    });
