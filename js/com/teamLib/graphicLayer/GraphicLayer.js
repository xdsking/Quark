/**
 * @summary 对esri/graphicLayer 扩展,使之支持向地图中添加统计图表
 * @Created by xuds on 2015/6/12.
 */
define([
    "dojo/_base/declare",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/graphic",
    "dojox/charting/Chart2D",
    "dojox/charting/themes/PlotKit/blue",
    "dojox/charting/action2d/Highlight",
    "dojox/charting/action2d/Tooltip"
], function (declare, GraphicsLayer, Point, Graphic, Chart2D, theme, Highlight, Tooltip) {
    return declare([GraphicsLayer], {
        constructor: function (options) {
            this._id = options.id || "";
            this._divId = options.chartDiv || "chart";
            this._charttype = options.chartType || "Pie";
            this._chartSize = options.size || 50;
        },
        // 重构esri/layers/GraphicsLayer方法
        _setMap: function (map, surface) {
            // GraphicsLayer will add its own listener here
            var div = this.inherited(arguments);
            return div;
        },
        _unsetMap: function () {
            this.inherited(arguments);
        },
        hide: function () {
            dojo.style(dojo.byId(this._divId), {
                "display": "none"
            });
        },
        show: function () {
            dojo.style(dojo.byId(this._divId), {
                "display": ""
            });
        },
        //拖拽
        _onPanStartHandler: function () {
            this.hide();
        },
        //缩放
        _onZoomStartHandler: function () {
            this.hide();
        },
        _onExtentChangeHandler: function () {
            this._refresh(true);
        },
        _refresh: function (redraw) {
            var that = this;
            var gs = this.graphics,
                _draw = this._draw;

            for (i = 0; i < gs.length; i++) {
                _draw(gs[i], redraw);
            }
            this.show();
        },
        _draw: function (graphic, redraw) {
            if (!this._map) {
                return;
            }
            if (graphic instanceof Graphic)//判断graphic是否为MapChartGraphic类型
            {
                this._drawChart(graphic, redraw);
            }
        },
        _drawChart: function (graphic, redraw) {
            var showMapPt = graphic.geometry,
                attribute = graphic.attributes;
            var showPt = map.toScreen(showMapPt);
            var id = attribute.code,
                series = [attribute.male, attribute.female];
            if (redraw) {
                dojo.byId(this._divId).removeChild(dojo.byId("div" + id));
            }
            if (attribute) {
                var _chartDiv = dojo.doc.createElement("div");
                _chartDiv.id = "div" + id;
                dojo.style(_chartDiv, {
                    "left": (showPt.x - this._chartSize / 4) + "px",
                    "top": (showPt.y - this._chartSize / 2) + "px",
                    "position": "absolute",
                    "width": this._chartSize + "px",
                    "height": this._chartSize + "px"
                });
                dojo.byId(this._divId).appendChild(_chartDiv);

                var _chart = new Chart2D(_chartDiv);
                var _themes = dojox.charting.themes.PlotKit.blue;
                _themes.chart.fill = "transparent";
                _themes.chart.stroke = "transparent";
                _themes.plotarea.fill = "transparent";
                _chart.setTheme(_themes);
                switch (this._charttype) {
                    case "Pie":
                    {//饼状图
                        _chart.addPlot("default", {
                            type: this._charttype,
                            labels: false
                        });
                        break;
                    }
                    case "StackedColumns":
                    {//柱状堆积图
                        _chart.addPlot("default", {
                            type: this._charttype,
                            labels: false,
                            markers: true,
                            gap: 2
                        });
                        break;
                    }
                    case "Lines":
                    {//柱状堆积图
                        _chart.addPlot("default", {
                            type: this._charttype,
                            labels: false,
                            markers: true,
                            radius: 1,
                            tension: "X"
                        });
                        break;
                    }
                    default:
                    {//柱状图
                        _chart.addPlot("default", {
                            type: this._charttype,
                            labels: false,
                            gap: 3
                        });
                        chart.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major" });
                        break;
                    }
                }
                _chart.addSeries(id, series, {stroke: {width: 1}});
                //效果
                new Highlight(_chart, "default", {highlight: "lightskyblue"});
                new Tooltip(_chart, "default");
                _chart.render();
            }
        }
    });
});