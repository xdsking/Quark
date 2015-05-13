define(["dojo/_base/declare", "dojo/_base/array", "require", "dojo/_base/lang", "dojo/_base/window", "dojo/dom-construct", "dojo/ready", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/registry",
    "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels",
    "onemap/store/TopicStore", "../../MapManager", "../../TopicManager"], function (declare, array, require, lang, window, domConstruct, ready, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, registry, HorizontalSlider, HorizontalRule, HorizontalRuleLabels, TopicStore, MapManager, TopicManager) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        baseClass: "horizontalSlider",
        templateString: "",
        sliderInstance: null,
        interval: null,
        map: null,
        topicManager: null,
        intervalTime: 2000,//自动播放间隔
        imagePath: require.toUrl("./images/"),
        layerInstanceList: [],
        isPlay: false,
        constructor: function (params) {
            this._createtemplateString(params.rules);
            this.inherited(arguments);
        },
        /**
         * @summary 根据数据库配置信息创建游标模板字段
         * @params rules 标尺数组
         */
        _createtemplateString: function (rules) {
            var ruleLabelItems = "";
            array.forEach(rules, function (rule) {
                ruleLabelItems += "<li value='" + rule.value + "' topicid='" + rule.ruleLabel + "'>" + rule.ruleLabel + "</li>";
            });
            this.templateString = '<div class="${baseClass}"><div data-dojo-type="dijit/form/HorizontalSlider" style="width:400px;float:left;margin-left:5px;margin-top:10px;" data-dojo-attach-point="horizontalSlider">' +
                '<div data-dojo-type="dijit/form/HorizontalRule" data-dojo-attach-point="horizontalRule" count=6 style="height:5px;"></div>' +
                '<ol data-dojo-type="dijit/form/HorizontalRuleLabels" data-dojo-attach-point="horizontalRuleLabels" style="height:1.5em;color:gray;">' + ruleLabelItems + '</ol></div><span style="float:left;margin-left:10px;margin-top:10px;cursor:pointer;"><img data-dojo-attach-point="sliderControl"></span></div>';
        },
        /**
         * @summary 根据参数rules初始化滑块
         */
        _initHorizontalSlider: function () {
            //var minimum=value=Math.max.apply(null, a);
            lang.mixin(this.horizontalSlider, {
                value: this.rules[0].value,
                minimum: this.rules[0].value,
                maximum: this.rules[this.rules.length - 1].value,
                discreteValues: this.rules.length,
                intermediateChanges: true,
                onChange: lang.hitch(this, this._addLayer, this.horizontalSlider.value)
            });
            this._addLayer(0, this.rules[0].value);
        },
        /**
         * @summary 根据value 确定topicid,添加要素图层
         * @params value是horizontalSlider的value参数
         */
        _addLayer: function (index, value) {
            var topicId = "", self = this;
            var rules = this.rules;
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].value == value) {
                    topicId = rules[i].topicid;
                    break;
                }
            }
            if (topicId == "") {
                console.log("未找到匹配的topicId");
                return;
            } else {
                TopicStore.getTopics({isBasemap: false}).then(function (responses) {
                    var subLayers = [];
                    array.forEach(responses, function (response) {
                        if (response.topicid === topicId || response.parentid === topicId) {
                            //subLayers.push(response.layer);
                            subLayers.push(response);
                        }
                    });
                    if (subLayers.length > 0) {
                        var map = self.map;
                        if (!self.topicManager) {
                            self.topicManager = TopicManager.getInstance(map);
                        }
                        array.forEach(self.layerInstanceList, function (layerInstance) {
                            //map.removeLayer(layerInstance);
                            self.topicManager.removeTopic(layerInstance);
                            lang.mixin(layerInstance, {checked: false});
                        });
                        self.layerInstanceList = [];
                        array.forEach(subLayers, function (layerInstance) {
                            self.layerInstanceList.push(layerInstance);
                            self.topicManager.addTopic(layerInstance);
                            lang.mixin(layerInstance, {checked: true});
                            /*require([layer.layerType],function(className){
                             var layerInstance=new className(layer.url,layer);
                             map.addLayer(layerInstance);
                             self.layerInstanceList.push(layerInstance);
                             });*/
                        });
                    } else {
                        console.log("未匹配到topicId对应的图层信息");
                    }
                });
            }
        },
        /**
         * @summary 初始化播放/暂停按钮
         */
        _initSliderControl: function () {
            var self = this;
            lang.mixin(this.sliderControl, {src: this.imagePath + "play.png", title: "播放"});
            this.sliderControl.onclick = function (evt) {
                    if (self.isPlay) {
                    lang.mixin(self.sliderControl, {src: self.imagePath + "play.png", title: "播放"});
                    self.isPlay = false;
                    self.clearIntervalRun();
                } else {
                    lang.mixin(self.sliderControl, {src: self.imagePath + "pause.png", title: "暂停"});
                    self.isPlay = true;
                    self.initIntervalRun();
                }
            }
        },
        postCreate: function () {
            var self = this;
            this.map = MapManager.getMap();//获取主地图对象
            ready(function () {
                self._initHorizontalSlider();
                self._initSliderControl();
            });
        },
        /**
         * @summary 播放函数
         */
        initIntervalRun: function () {
            var self = this;
            this.interval = setInterval(function () {
                /*if(!self.horizontalSlider){
                 clearInterval(self.interval);
                 return;
                 }*/
                var instance = self.horizontalSlider;
                if (instance.value > instance.maximum - 1) {
                    instance.setValue(instance.minimum);
                } else {
                    instance.setValue(instance.getValue() + 1);
                }
                instance.startup();
            }, self.intervalTime);

        },
        /**
         * @summary 停止播放
         */
        clearIntervalRun: function () {
            clearInterval(this.interval);
            //TODO
        },
        destroy: function () {
            var self = this;
            this.clearIntervalRun(this.interval);
            array.forEach(this.layerInstanceList, function (layerInstance) {
                self.topicManager.removeTopic(layerInstance);
                lang.mixin(layerInstance, {checked: false});
            });
            this.layerInstanceList = [];
            this.inherited(arguments);
        }
    });
});