/**
 * Created by xuds on 2016/1/12.
 */
define(["jquery", "require"], function ($, require) {
    return {
        //异步加载css文件
        loadStyleSheet: function (url) {
            //获得相对于baseUrl的地址
            var cssUrl = require.toUrl(url);
            $("head").append($("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: cssUrl
            }));
        },
        loadTemplate: function (url, position) {
            var deferred = $.Deferred();
            var templateUrl = require.toUrl(url);
            var res = $.get(templateUrl);
            res.done(function (template) {
                var $template = $(template);
                $(position).append($template);
                deferred.resolve($template);
            });
            return deferred;
        }
    }
});