define(["require","dojo/_base/declare","dojo/fx","dojo/on","dojo/dom","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/_base/window","dojo/_base/Color","dojo/text!./SpatialQueryPane.html",
    "dojo/data/ObjectStore",
    "dojo/store/Memory","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol",
    "esri/toolbars/draw","esri/graphic","../../MapManager",
    "dojox/layout/TableContainer","dijit/form/Select","dijit/form/RadioButton","dijit/form/NumberTextBox","dijit/form/TextBox","dijit/dijit"
],function(require,declare,fx,on,dom,lang,array,domConstruct,window,Color,template,ObjectStore,Memory,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,
           SimpleLineSymbol,SimpleFillSymbol,
           Draw,Graphic,MapManager
    ){
    return declare([_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{
        templateString:'<div class="${baseClass}"> <div data-dojo-attach-point="extentPane" class="${baseClass}ExtentPane"> <input type="radio" data-dojo-type="dijit/form/RadioButton" data-dojo-attach-point="fullScreen" id="${id}_fullScreen" checked="checked" name="extentItem"><label for="${id}_fullScreen">全幅&nbsp;&nbsp;</label> <input type="radio" data-dojo-type="dijit/form/RadioButton" data-dojo-attach-point="currentScreen" id="${id}_currentScreen" name="extentItem"><label for="${id}_currentScreen">当前&nbsp;&nbsp;</label> <input type="radio" data-dojo-type="dijit/form/RadioButton" data-dojo-attach-point="userDefined" id="${id}_userDefined" name="extentItem"><label for="${id}_userDefined">自定义区域</label> </div> <div data-dojo-attach-point="userDefinedGeometryTypePane" style="visibility:hidden;height:0"> <div data-dojo-type="dojox/layout/TableContainer" style="padding-top:5px;padding-left:0" data-dojo-props="labelWidth:60,showLabels:true,cols:2,style:\'text-align: left\'"> <select data-dojo-attach-point="userDefinedGeometryType" style="width:80px" data-dojo-props="label:\'选择工具:\'" data-dojo-type="dijit/form/Select"></select> </div> </div> </div>',
        baseClass:"DrawGeoPane",
        map:null,
        nav:null,
        _draw:null,
        drawTypes:[{"circle": "圆形"},{"polygon": "多边形"},{"extent": "矩形"},{"ellipse": "椭圆"}],
        extentGraphic:null,
        polygonSymbol:null,
        defaultLineSymbol:null,
        lineSymbol:null,
        cssPath:require.toUrl("./DrawGeoPane.css"),
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
            var map = this.map;
            if (!map || typeof map == "string") {
                this.map = MapManager.getMap(map);
            }
            if (!this.lineSymbol) {
                this.lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(4).setColor(new Color([0,225,225]));
            }
        },
        postCreate:function(){
            dom.setSelectable(this.domNode,false);
            this._initSelectOption();
            this._initTagsAction();
            this.startup();//哎!!没有这句,TableContainer构造组件时,label属性无法加载;
        },
        _initSelectOption:function(){
            var self=this;
            array.forEach(this.drawTypes,function(drawType){
                for(name in drawType){
                    var optionItem=domConstruct.create("option",{value:name,innerHTML:drawType[name]});
                    self.userDefinedGeometryType.addOption(optionItem);
                }
            });
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
            function onUserDefinedChange(){
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
                        self.clearDrawActivate();
                        self.clearAuxiliaryGeo();
                    }
                }
            };
            /*this.userDefined.onChange=function(){
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
             };*/
            this.own(on(self.userDefinedGeometryType,"change",function(){
                    self._draw.activate(arguments[0]);
                }),
                on(self.userDefinedGeometryType,"DblClick",function(){
                    self._draw.activate(self.userDefinedGeometryType.value);
                }),
                on(self.userDefined,"change",onUserDefinedChange));
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
                geometry= this.geometry||"未获得查询区域";
            }
            return geometry;
        },
        removeExtentGraphic:function(){
            if(this.extentGraphic){
                this.map.graphics.remove(this.extentGraphic);
            }
        },
        clearAuxiliaryGeo:function(){
            this.removeExtentGraphic();
        },
        clearDrawActivate:function() {
            if(this._draw){
                this.map.setMapCursor("default");
                this._draw.deactivate();
            }
        },
        destroy:function(){
            this.clearDrawActivate();
            this.clearAuxiliaryGeo();
            this.inherited(arguments);
        }

    });

});