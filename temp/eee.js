define(["require","dojo/_base/declare","dojo/_base/array","dojo/_base/window","dojo/_base/lang","dojo/_base/Color","dijit/_WidgetBase",
        "dojo/dom-construct","../../../MapManager","onemap/widget/infoTemplate/InfoTemplate","esri/graphic",
        "esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/graphicsUtils"
    ],function(require,declare,array,window,lang,Color,_WidgetBase,
               domConstruct,MapManager,InfoTemplate,Graphic,
               PictureMarkerSymbol,SimpleFillSymbol,SimpleLineSymbol,graphicsUtils
        ){
        var cssLinkCreated=false;
        var instance;
        var ShowFeaturesToMap= declare([_WidgetBase],{
            graphicsList:[],
            featureSets:null,
            featureAttributes:null,
            map:null,
            imagesPath : require.toUrl("./images/"),
            defaultPointSymbol:null,
            highLightPointSymbol:null,
            defaultPolygonSymbol:null,
            highLightPolygonSymbol:null,
            defaultLineSymbol:null,
            highLightLineSymbol:null,
            fieldAliases:null,
            infoWindowDisplayFields:[],//从数据库中获取在infoWindo中显示的字段;
            _previousGraphics:[],//高亮显示的Graphics
            constructor:function(params,srcNodeRef) {
                if (!instance) {
                    instance = this;
                }
                this._initSymbol();
            },
            /**
             * 初始化要素对象的样式属性
             */
            _initSymbol:function(){
                this.defaultPointSymbol = new PictureMarkerSymbol(
                    {
                        angle:0,xoffset:-1,yoffset:11,
                        url:this.imagesPath+"RedPin1LargeB.png",
                        width:30,height:30
                    });
                this.highLightPointSymbol = new PictureMarkerSymbol(
                    {
                        angle:0,xoffset:-1,yoffset:11,
                        url:this.imagesPath+"BluePin1LargeB.png",
                        width:30,height:30
                    });
                var lineSymbol =new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([111, 0, 255]),
                    0.2);//.setWidth(1);
                this.defaultPolygonSymbol= new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,lineSymbol,new Color([111, 0, 255, 0.15]));//.setOutline(lineSymbol);
                var lineSymbol =new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2).setColor(new Color([211, 0, 0]));
                this.highLightPolygonSymbol=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,lineSymbol,new Color([211, 0, 255, 0.5]));//.setOutline(lineSymbol);

                this.defaultLineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(3);
                this.highLightLineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASH).setWidth(4);

            },
            postMixInProperties:function() {
                if (!this.map||typeof this.map == "string") {
                    this.map = MapManager.getMap(this.map);
                }
            },
            postCreate:function(){
                this.featureAttributes=this._createFeatureAttributes();
                //this.addGraphicsToMap();
                this._initInfoWindow();
            },
            /**
             * 查询结果添加到地图中  将移动到showFeatureToMap类中
             */
            addGraphicsToMap:function(){
                var self=this;
                array.forEach(this.featureAttributes,function(featureAttribute){
                    var graphic=null;
                    var temGraphic=featureAttribute.__graphic;
                    if(temGraphic.attributes.__graphic){
                        graphic=temGraphic;
                        lang.mixin(graphic.attributes,{__graphic:null});
                    }else{
                        graphic=temGraphic;
                    }
                    var infoWindow=self.showInfoWindow(graphic);
                    graphic.setInfoTemplate(infoWindow);
                    self.graphicsList.push(graphic);
                    self.map.graphics.add(graphic);
                });
            },
            /**为featureAttributes 添加__graphic属性，可用于地图操作
             * @param featureSets
             * return __graphic
             */
            _createFeatureAttributes:function(featureSets) {
                var featureSets=featureSets?featureSets:this.featureSets;
                var id=0,featureAttributes=[],self=this;
                array.forEach(featureSets,function(featureSet) {
                    var symbol;
                    switch (featureSet.geometryType) {
                        case "esriGeometryPoint":
                        case "esriGeometryMultipoint":
                            symbol = self.defaultPointSymbol;
                            break;
                        case "esriGeometryPolyline":
                            symbol = self.defaultLineSymbol;
                            break;
                        case "esriGeometryPolygon":
                            symbol = self.defaultPolygonSymbol;
                            break;
                    }
                    array.forEach(featureSet.features,function(feature) {
                        if (symbol) {
                            feature.setSymbol(symbol);
                        }
                        var attributes = feature.attributes;
                        attributes["__id"] = id++;
                        attributes["__graphic"]=feature;
                        featureAttributes.push(attributes);
                    });
                });
                return featureAttributes;
            },

            _initInfoWindow:function(){
                var self=this;
                //this.map.graphics.on("click",lang.hitch(this,"showInfoWindow"));
                this.map.graphics.on("mouse-over",function(){
                    self.map.setMapCursor("pointer");
                });
                this.map.graphics.on("mouse-out",function(){
                    self.map.setMapCursor("default");
                });
            },
            showInfoWindow:function(graphic){
                if(!this.fieldAliases){
                    this.fieldAliases=this.featureSets[0].fieldAliases;
                }
                var attrResults=graphic.attributes;
                if(!attrResults){
                    return;
                }
                var content=[];
                if(this.infoWindowDisplayFields&&this.infoWindowDisplayFields.length&&this.infoWindowDisplayFields.length>0){
                    for(var i=0;i<this.infoWindowDisplayFields.length;i++){
                        if(typeof this.fieldAliases[this.infoWindowDisplayFields[i]]=="undefined"){
                            continue;
                        }
                        var label=this.fieldAliases[this.infoWindowDisplayFields[i]],value=attrResults[this.infoWindowDisplayFields[i]]||" ";
                        //content+="<b>"+label+":" +value + "</b></br>";
                        content.push({name:label,value:value});
                    }
                }else{
                    for(var attrName in attrResults){
                        if(typeof this.fieldAliases[attrName]=="undefined"){
                            continue;
                        }
                        if(attrResults[attrName]==null){
                            attrResults[attrName]="";
                        }
                        //content+="<b>"+this.fieldAliases[attrName]+":" + attrResults[attrName]+ "</b></br>";
                        lang.mixin(content,{this.fieldAliases[attrName]:attrResults[attrName]||""});
                }
            }
            var infoTitle="<b>详细信息</b>";
        var infoTemplate=new InfoTemplate({title:infoTitle,content:content,theme:"primary"});//
        //infoTemplate.setTitle(infoTitle);
        //infoTemplate.setContent(content);
        //infoTemplate.show(evt.screenPoint);
        //evt.graphic.setInfoTemplate(infoTemplate);
        return infoTemplate;

    },
    /**
     * @summary:移除通过查询添加到地图中的graphic;
     */
    _removeGraphics:function(graphicsList,map){
    array.forEach(graphicsList,function(graphic){
        map.graphics.remove(graphic);

    });
},
showPointMarker:function(params){
    var graphic=params.graphic,geometry=graphic.geometry,isShowFeaturesOnMap=params.isShowFeaturesOnMap;
    var pointMarkerSymbol = new PictureMarkerSymbol(
        {
            angle:0,xoffset:-1,yoffset:11,
            url:this.imagesPath+graphic.avatar,
            width:16,height:24
        });;
    if (geometry.type=="point" || geometry.type=="multipoint") {
        if(isShowFeaturesOnMap){

        }else{
            graphic.setSymbol(pointMarkerSymbol);
        }
    }
    else {
        var centerPointer;
        if(geometry._partwise&&geometry._partwise.length>1){
            centerPointer=geometry._partwise[0].getCenter();
        }else{
            centerPointer=geometry.getExtent().getCenter();
        }
        var centerGraphic=new Graphic(centerPointer);
        centerGraphic.setSymbol(pointMarkerSymbol);
        this.map.graphics.add(centerGraphic);
    }
},
/**
 * 高亮显示graphics
 */
highlightGraphics:function(params){
    var graphics=params.graphics,highlightSymbol,
        defaultSymbol,isShowFeaturesOnMap=params.isShowFeaturesOnMap;


    if (this._previousGraphics.length>0) {
        array.forEach(this._previousGraphics,lang.hitch(this,function(graphic){
            if(isShowFeaturesOnMap){
                var symbolType=this._getSymbolType(graphic);
                graphic.setSymbol(symbolType.defaultSymbol);
            }else{
                this.map.graphics.remove(graphic);
            }
        }));
        this._previousGraphics=[];
    }
    if(lang.isArray(graphics)&&graphics.length>1){
        array.forEach(graphics,lang.hitch(this,function(graphic){
            var geometry=graphic.geometry;
            this.addHighlightGraphic(graphic);
        }));
        var extents=graphicsUtils.graphicsExtent(graphics);
        this.map.setExtent(extents.expand(1.5));

    }else{
        if(lang.isArray(graphics)){graphics=graphics[0]}
        this.addHighlightGraphic(graphics);//graphics
        var geometry=graphics.geometry;
        if (geometry.type=="point" || geometry.type=="multipoint") {
            this.map.centerAndZoom(geometry,3);
        }
        else {
            this.map.setExtent(geometry.getExtent().expand(1.5));
        }
    }
},
/**
 * 根据geometry的type类型,返回图斑样式'
 */
_getSymbolType:function(graphic){
    switch (graphic.geometry.type) {
        case "point":
        case "multipoint":
            highlightSymbol=this.highLightPointSymbol;
            defaultSymbol=this.defaultPointSymbol;
            break;
        case "polyline":
            highlightSymbol=this.highLightLineSymbol;
            defaultSymbol=this.defaultLineSymbol;
            break;
        case "polygon":
        case "extent":
            highlightSymbol=this.highLightPolygonSymbol;
            defaultSymbol=this.defaultPolygonSymbol;
            break;
    }
    return {highlightSymbol:highlightSymbol,defaultSymbol:defaultSymbol};
},
addHighlightGraphic:function(graphic){
    if(graphic.attributes.__graphic){
        graphic.attributes.__graphic=null;
    }
    var symbolType=this._getSymbolType(graphic);
    this._previousGraphics.push(graphic);
    graphic.setSymbol(symbolType.highlightSymbol);
    this.map.graphics.add(graphic);
},
/**
 * 移除底图中的Graphics,隐藏infoWindow
 */
removeGriphicsAndInfoWindow:function(){
    if(this.graphicsList.length>0){
        this._removeGraphics(this.graphicsList,this.map);
        this.graphicsList=[];
    }
    if(this._previousGraphics.length>0){
        array.forEach(this._previousGraphics,lang.hitch(this,function(graphic){
            this.map.graphics.remove(graphic);
        }));
    }
    if(this.map){
        this.map.infoWindow.hide();
    }
},
destroy:function(){
    this.removeGriphicsAndInfoWindow();
    this.inherited(arguments);
    if(this.graphicsList.length>0){
        this._removeGraphics(this.graphicsList,this.map);
        this.graphicsList=[];
    }
    if(this._previousGraphics.length>0){
        array.forEach(this._previousGraphics,lang.hitch(this,function(graphic){
            this.map.graphics.remove(graphic);
        }));
        this._previousGraphics=[];
    }
    if(this.map){
        this.map.infoWindow.hide();
    }
}
});
ShowFeaturesToMap.getInstance = function(params) {
    if (!instance) {
        instance = new ShowFeaturesToMap(params);
    }
    return instance;
};
/*
 * 销毁ShowFeaturesToMap实例
 */
ShowFeaturesToMap.destroyInstance = function() {
    if(instance){
        instance.destroy();
        instance=null;
    }
};
return ShowFeaturesToMap;
});