/**
 * Created by xuds on 2016/1/12.
 */

require.config({
    baseUrl: 'js/app',
    paths: {
        jquery: "./jQuery-1.11.1"
    }
});
require(["jquery", "infoWindow/infoWindow"], function ($, infoWindow) {
    $("#showInfoWindow").click(function () {
        infoWindow.show();
    });
    $("#hideInfoWindow").click(function () {
        infoWindow.hide();
    });
});