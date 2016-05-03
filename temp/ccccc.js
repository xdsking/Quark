define(function (require, exports, module) {
    return{
        startup: function (map, flag, successCallback, cancleCallback) {
            var $mapTaget = $(map.getTargetElement());
            if (flag) {
                $mapTaget.css("cursor", "crosshair");
                mapClickHandle = map.once("singleclick", function (evt) {
                    $mapTaget.css("cursor", "default");
                    var coordinate = evt.coordinate;
                    function createStyle(src, img) {
                        return new ol.style.Style({
                            image: new ol.style.Icon(({
                                anchor: [0.5, 0.96],
                                src: src,
                                img: img,
                                imgSize: img ? [img.width, img.height] : undefined
                            }))
                        });
                    }

                    var iconFeature = new ol.Feature(new ol.geom.Point(coordinate));
                    iconFeature.set('style', createStyle('../js/errorCorrection/img/RedStickpin.png', undefined));
                    graphicLayer = new ol.layer.Vector({
                        style: function (feature) {
                            return feature.get('style');
                        },
                        source: new ol.source.Vector({features: [iconFeature]})
                    });
                    map.addLayer(graphicLayer)
                    var anim_lay = require("_/anim_lay/anim_lay");
                    require("./css/errorCorrection.css");
                    $.get("../js/errorCorrection/template/template.html", function (data) {
                        $("body").append(data);
                        var dialog = new anim_lay({
                            el: $(".errorCorrectionForm"),
                            title: "地图纠错",
                            layerCfg: {}
                        });
                        dialog.outerStyle({
                            top: 200,
                            left: 300,
                            width: 400,
                            height: 180
                        });
                        dialog.show();
                        dialog.ec.on("hide", function () {
                            map.removeLayer(graphicLayer);
                            graphicLayer = null;
                            if (typeof cancleCallback === "function") {
                                dialog = null;
                                $(".errorCorrectionForm").parent().parent().remove();
                                cancleCallback();
                            }
                        });
                        var $details = $(".errorCorrectionForm textarea"), details = $details.val();
                        $details.keyup(function () {
                            if ($details.val().trim() != "") {
                                $details.removeClass("detailsEmpty");
                            } else {
                                $details.addClass("detailsEmpty");
                                $details.attr("placeholder", "错误描述不能为空");
                            }
                        });
                        $("#submitErrorCorrection").click(function () {
                            if (typeof successCallback === "function") {
                                details = $details.val().trim();
                                if (details == "") {
                                    return false;
                                }
                                var params = {
                                    details: details,
                                    place: "POINT(" + coordinate.toString().replace(",", " ") + ")"
                                };
                                successCallback(params);
                            }
                            dialog.hide();
                            return false;
                        });
                        $("#cancleErrorCorrection").click(function () {
                            dialog.hide();
                            if (typeof cancleCallback === "function") {
                                cancleCallback();
                            }
                            return false;
                        });
                    });
                });
            } else {
                $mapTaget.css("cursor", "default");
                map.removeLayer(graphicLayer);
                graphicLayer = null;
                if ($(".errorCorrectionForm").length > 0) {
                    $(".errorCorrectionForm").parent().parent().remove();
                }
                mapClickHandle.markAsRemoved();
                mapClickHandle = null;
            }

        }
    };
});