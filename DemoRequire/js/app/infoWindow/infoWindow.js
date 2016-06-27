/**
 * Created by xuds on 2016/6/27.
 */
define(["util"], function (util) {
    var $self;
    util.loadStyleSheet("./infoWindow/infoWindow.css");
    util.loadTemplate("./infoWindow/infoWindow.html", "body").done(function ($template) {
        $self = $template;
        var close = $template.find("#popup-closer");
        close.on("click", function () {
            $template.fadeOut();
        })
    });
    return {
        show: function () {
            $self.fadeIn();
        },
        hide: function () {
            $self.fadeOut();
        }
    }
});