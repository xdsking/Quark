define(["dojo/_base/declare","esri/request","dojo/json","dojo/_base/lang"],function(declare,esriRequest,JSON,lang){
    return declare(null,{
        serverUrl:"http://localhost:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute",
        map:null,
        format:"PDF",
        layoutTemplate:"Letter ANSI A Landscape",
        options:{
            "mapOptions": {
                "showAttribution": true,
                "extent": {
                    "xmin": 37429253.914243326,
                    "ymin": 2361729.1751253344,
                    "xmax": 37724794.08865701,
                    "ymax": 2518362.821725961,
                    "spatialReference": {
                        "wkid": 2361,
                        "latestWkid": 2361
                    }
                },
                "spatialReference": {
                    "wkid": 2361,
                    "latestWkid": 2361
                },
                "scale": 999999.9999999959
            },
            "operationalLayers": [
                {
                    "id": "8b6043290cce4b9b8a9cdc038cc7ff3d",
                    "title": "8b6043290cce4b9b8a9cdc038cc7ff3d",
                    "opacity": 1,
                    "minScale": 1000000,
                    "maxScale": 4000,
                    "url": "http://localhost:6080/arcgis/rest/services/YJ/XZQ/MapServer"
                },
                {
                    "id": "mapPane_graphics",
                    "opacity": 1,
                    "minScale": 0,
                    "maxScale": 0,
                    "featureCollection": {
                        "layers": []
                    }
                }
            ],
            "layoutOptions": {
                /*"titleText": "打印标题",*/
                "customTextElements": [
                    {
                        "dwmc": "清远市清城区龙塘房地产开发公司"
                    },
                    {
                        "zdh": "6100001"
                    },
                    {
                        "tdyt": "商性用地"
                    },
                    {
                        "mj": "10000km2"
                    },
                    {
                        "hzrq": "2015/01/02"
                    },
                    {
                        "shrq": "2015/03/05"
                    },
                    {
                        "hty": "张三"
                    },
                    {
                        "shy": "李四"
                    },
                    {
                        "chdw": "清远市国土局"
                    }
                ],
                "scaleBarOptions": {
                    "metricUnit": "Kilometers",
                    "metricLabel": "km",
                    "nonMetricUnit": "Miles",
                    "nonMetricLabel": "mi"
                },
                "legendOptions": {
                    "operationalLayers": []
                }
            }
        },
        constructor:function(params){
            declare.safeMixin(this, params);
            this._initOptionsParam();
        },
        /*postCreate:function(){

         }*/
        _initOptionsParam:function(){
            if(!this.map){
                console.log("未获得地图对象!");
                return;
            }else{
                var extent=this.map.extent,options=this.options;
                if(options&&options.mapOptions&&options.mapOptions.extent){
                    options.mapOptions.extent=

                }
            }
        },
        execute:function(){
            if(!lang.isString(this.options)){
                this.options=JSON.stringify(this.options);
            }
            var content = {
                Web_Map_as_JSON:this.options,
                Format:this.format,//"PDF",
                Layout_Template:this.layoutTemplate,//"Letter ANSI A Landscape",
                f : "json"
            };
            var foo = esriRequest({
                url :this.serverUrl,
                content : content,
                callbackParamName : "callback"
            });
            foo.then(function(data) {
                debugger;
            },function(){
                console.log("提交失败!");
            });
        }
    });
});