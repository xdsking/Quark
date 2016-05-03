/**
 * Created by xuds on 2016/4/29.
 */
var zoom = 14, mapClick = null;
/**
 * @summary 初始化底图
 */
var initMap = function () {
    map = new AMap.Map('mapBox', {
        resizeEnable: true,
        layers: [new AMap.TileLayer.Satellite()],
        zoom: 14,
        center: [108.947071, 34.261365]

    });
    return map;

};
/**
 * @summary 添加要素点
 * @param feature
 */
function addMarker(map, feature) {
    var marker = new AMap.Marker({
        icon: "img/mapMark.png",
        position: [feature.lng, feature.lat]
    });
    regMarkerClick(marker, feature);
    marker.setMap(map);

}
var regMapClick = function (map) {
    var clickEventListener = map.on('click', function (e) {
        console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
    });
    return clickEventListener;
}

/**
 * @summary 注册标注点击事件
 * @param marker 标注点
 * @param feature 要素对象
 */
function regMarkerClick(marker, feature) {
    marker.on('click', function () {
        alert("标注点名称：" + feature.name);
    });
}
/**
 * @summary 左侧地图导航
 * @param map
 */
var addToolBar = function (map) {
    map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
    });
}
$(function () {
    var map = initMap();
    addToolBar(map);
    regMapClick(map);
    /*$.get("data/feature.json", function (featureList) {
        $.each(featureList, function (index, feature) {
            addMarker(map, feature);
        })
    });*/
    var featureList=[
        {
            "id": "mt1",
            "name": "终端1",
            "lng": 108.97882,
            "lat": 34.25331
        },
        {
            "id": "mt2",
            "name": "终端2",
            "lng": 108.94483,
            "lat": 34.27743
        },
        {
            "id": "mt3",
            "name": "终端3",
            "lng": 108.8857,
            "lat": 34.24877
        },
        {
            "id": "mt4",
            "name": "永宁门",
            "lng": 108.94286,
            "lat": 34.24933
        },
        {
            "id": "mt5",
            "name": "终端4",
            "lng": 108.9523,
            "lat": 34.27317
        },
        {
            "id": "mt6",
            "name": "终端5",
            "lng": 108.95153,
            "lat": 34.26345
        },
        {
            "id": "mt6",
            "name": "终端5",
            "lng": 109.02929,
            "lat": 34.27296
        },
        {
            "id": "mt6",
            "name": "终端5",
            "lng": 108.93247,
            "lat": 34.30416
        }
    ];
    $.each(featureList, function (index, feature) {
        addMarker(map, feature);
    })
});