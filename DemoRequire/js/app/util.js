/**
 * Created by xuds on 2016/1/12.
 */
define(["jquery", "require"], function ($, require) {
    return {
        /**
         * @summary 加载css文件
         * @param url
         */
        loadStyleSheet: function (url) {
            //获得相对于baseUrl的地址
            var cssUrl = require.toUrl(url);
            $("head").append($("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: cssUrl
            }));
        },
        /**
         * @summary 异步加载模板
         * @param url 模板路径
         * @param [position] 放置位置
         * @returns deferred
         */
        loadTemplate: function (url, position) {
            var deferred = $.Deferred();
            var templateUrl = require.toUrl(url);
            var res = $.get(templateUrl);
            res.done(function (template) {
                var $template = $(template);
                if (position) {
                    $(position).append($template);
                }
                deferred.resolve($template);
            });
            return deferred;
        }
    }
});