define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin","dojo/text!./SpatialQueryPane.html",
        "dojo/fx","dojo/on","dojo/dom","dojo/_base/lang","dojo/dom-construct","dojo/_base/window","dojo/_base/Color","require","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol",
        "esri/toolbars/draw","esri/graphic",
        "dojox/layout/TableContainer","dijit/form/Select","dijit/form/RadioButton","dijit/form/NumberTextBox","dijit/form/TextBox","dijit/dijit"],
    function(declare,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,template,
        fx,on,dom,lang,domConstruct,window,Color,require,SimpleLineSymbol,SimpleFillSymbol,
        Draw,Graphic
        ){
    return declare([_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{
        templateString:template,
        baseClass:"GeometryWidget",
        map:null,
        nav:null,
        _draw:null,
        extentGraphic:null,
        polygonSymbol:null,
        defaultLineSymbol:null,
        lineSymbol:null,
        cssPath:require.toUrl("./SpatialQueryPane.css"),
        constructor:function(){
            domConstruct.create("link", {
                rel : "stylesheet",
                type : "text/css",
                href : this.cssPath
            }, window.doc.head||window.doc.getElementsByTagName("head")[0]);
            var lineSymbol =new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(1);
            this.polygonSymbol= new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL).setOutline(lineSymbol);

            var lineSymbol2 =new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(4);
            this.defaultLineSymbol=lineSymbol2;

            /*var map = this.map;
            if (map) {
                this._createDraw(map);
                this.nav = MapManager.getNav(map);
            }*/
        },
        postMixInProperties:function(){
            if (!this.lineSymbol) {
                this.lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(4).setColor(new Color([0,225,225]));
            }
        },
        postCreate:function(){
            dom.setSelectable(this.domNode,false);//禁止鼠标左键选中;
            this._initTagsAction();
            this.startup();//哎!!没有这句,TableContainer构造组件时,label属性无法加载;
        },
        _createDraw:function(map){
            var draw=this._draw;
            if(!draw){
                draw=this._draw = new Draw(map);
                draw.setLineSymbol(this.lineSymbol);
                this.own(on(draw,"draw-end",lang.hitch(this,"_onDrawEnd")));
            }
            map.setMapCursor("crosshair");
            draw.activate(this.userDefinedGeometryType.value);
        },
        _onDrawEnd:function(evt) {
            this.removeExtentGraphic();
            var geometry=evt.geometry,extentGraphic;
            if(geometry.type=="extent"||geometry.type=="polygon"){
                extentGraphic = new Graphic(geometry,this.polygonSymbol);
            }else if(geometry.type=="polyline"){
                extentGraphic = new Graphic(geometry,this.defaultLineSymbol);
            }
            this.extentGraphic = extentGraphic;
            if (this.map&&extentGraphic) {
                this.map.graphics.add(extentGraphic);
            }
            this._setGeometry(evt.geometry);
        },
        /**
         * 控制下拉列表改变时，标签的显示or隐藏效果;
         */
        _initTagsAction:function(){
            var self=this;
            //”自定义“ 按钮改变事件
            this.userDefined.onChange=function(){
                if(arguments[0]==true){
                    fx.wipeIn({
                        node:self.userDefinedGeometryTypePane
                    }).play();

                }else{
                    fx.wipeOut({
                        node:self.userDefinedGeometryTypePane
                    }).play();
                }
                if(arguments[0]==true){
                    self._createDraw(self.map);
                }else{
                    if(self._draw){
                        self.clear();
                    }
                }
            };
            this.own(on(self.userDefinedGeometryType,"change",function(){
                self._draw.activate(arguments[0]);
           }));
        },
        _setGeometry:function(geometry) {
            this.geometry = geometry;
            //this._set("value",this.geometry?JSON.stringify(this.geometry.toJson()):null);
        },
        getGeometry:function(){
            var geometry=null;
            if(this.fullScreen.checked){
                if (this.map.layerIds.length == 0) {
                    return geometry;
                }
                else {
                    geometry = this.map.getLayer(this.map.layerIds[0]).fullExtent;

                }
            }else if(this.currentScreen.checked){
                geometry= this.map.extent;
            }else if(this.userDefined.checked){
                geometry= this.geometry||"为获得查询区域";
            }
            return geometry;
        },
        removeExtentGraphic:function(){
            if(this.extentGraphic){
                this.map.graphics.remove(this.extentGraphic);
            }
        },
        clear:function() {
            this.map.setMapCursor("default");
            this.removeExtentGraphic();
            this._draw.deactivate();
        },
        destroy:function(){
            this.clear();
            this.inherited(arguments);
        }

    });

});