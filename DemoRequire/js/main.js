/**
 * Created by xuds on 2016/1/12.
 */

requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: "./jQuery-1.11.1"
    }
});
requirejs(["jquery"], function ($) {
    requirejs(["infoWindow/infoWindow"], function (infoWindow) {
        $("#showInfoWindow").click(function () {
            infoWindow.show();
        });
        $("#hideInfoWindow").click(function () {
            infoWindow.hide();
        });
    });
});