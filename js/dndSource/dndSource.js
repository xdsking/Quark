/**
 * Created by xuds on 2015/4/9.
 */
(function ($) {
    $.fn.dndSource = function (params) {
        /*if (this.length == 0) {
         var dndSource = $("<div></div>");
         dndSource.attr({id: params.id});
         dndSource.appendTo("body");
         this.push(dndSource[0]);
         }*/
        if (this.children().length > 0) {
            return this.children();
        }
        var options = $.fn.dndSource.options = {
            theme: "info",
            closable: true,
            content: null,
            title: "　",
            speed: 500,
            dockable: true,
            dndBodyMinHeight: "300px",
            containerNode: document.body,
            dockTo: $("#dockBar"),
            dndPanelNode: null,
            containment: "body"//parent
        };
        $.extend(options, params);
        var dndSource = $("<div></div>");
        dndSource.addClass("panel panel-" + options.theme);
        dndSource.attr({
            id: options.id,
            style: options.style,
            role: "alert"
        });
        this.append(dndSource);
        //title
        var dndTitleNode = $('<div></div>');
        dndTitleNode.addClass("panel-heading cstm-drag-panel-heading");
        dndTitleNode.text(options.title);
        dndTitleNode.appendTo(dndSource);
        var self = this;
        //关闭
        if (options.closable) {
            var dndCloseNode = $('<span></span>');
            dndCloseNode.addClass("glyphicon glyphicon-remove cstm-titleOption");
            dndCloseNode.attr({
                "operate-destroy": options.id,
                "aria-hidden": "true",
                title: "关闭"
            });
            /**
             * 关闭按钮点击事件
             */
            dndCloseNode.click(function () {
                $(self).dndSource.destroy(dndSource);
            });
            dndCloseNode.appendTo(dndTitleNode);
        }
        //最小化
        if (options.dockable) {
            var dndMinNode = $('<span></span>');
            dndMinNode.addClass("glyphicon glyphicon-minus cstm-titleOption");
            dndMinNode.attr({
                "operate-minimize": options.id,
                "aria-hidden": "true",
                title: "最小化"
            });
            /**
             * 最小化点击事件
             */
            dndMinNode.click(function () {
                $(self).dndSource.hide({domNode: dndSource, options: options});
            });
            dndMinNode.appendTo(dndTitleNode);
        }
        //dndBody
        var dndBodyNode = $('<div></div>');
        dndBodyNode.addClass("panel-body");
        dndBodyNode.css("min-height", options.dndBodyMinHeight);
        dndBodyNode.appendTo(dndSource);

        if (options.content) {
            dndBodyNode.append(options.content);
        }
        /*if (typeof options.containerNode === "string") {
         this.appendTo(options.containerNode);
         } else {
         this.appendTo("body");
         }*/
        dndSource.draggable({
            cursor: "move",
            containment: options.containment//$("#alterPanel")
        });
        return dndSource;
    };
    $.fn.dndSource.show = function (domNode) {
        var speed = this.options.speed;
        $.each(domNode, function (index, item) {
            var dockBarItem = $("[dock-handle=" + item.id + "]");
            if (dockBarItem.length > 0) {
                dockBarItem.fadeOut(speed, function () {
                    dockBarItem.remove();
                });
            }
        });
        domNode.fadeIn(speed);
    };
    $.fn.dndSource.hide = function (params) {
        var speed = this.options.speed;
        params.domNode.fadeOut(speed);
        var options = params.options, dockTo = options.dockTo, theme = options.theme, title = options.title;
        //避免重复点击dock多个
        if ($("[dock-handle=" + options.id + "]").length > 0) {
            return;
        }
        var dockItem = $("<div></div>");
        dockItem.addClass("panel panel-" + theme + " cstm-dock-item");
        dockItem.attr({
            "dock-handle": options.id
        });
        //双击显示
        dockItem.dblclick(function () {
            $(params.domNode).dndSource.show(params.domNode);
            dockItem.remove();
        });
        var dockPanelHeading = $("<div></div>");
        dockPanelHeading.addClass("panel-heading cstm-dock-item-heading");
        dockPanelHeading.text(title);
        dockPanelHeading.appendTo(dockItem);
        //关闭
        var dockPanelDestroy = $("<span></span>");
        dockPanelDestroy.addClass("glyphicon glyphicon-remove cstm-titleOption");
        dockPanelDestroy.attr({
            title: "关闭",
            "aria-hidden": "true"
        });
        dockPanelDestroy.click(function () {
            $(params.domNode).dndSource.destroy(params.domNode);
            dockItem.remove();
        });
        dockPanelDestroy.appendTo(dockPanelHeading);
        //显示
        var dockPanelShow = $("<span></span>");
        dockPanelShow.addClass("glyphicon glyphicon-folder-close cstm-titleOption");
        dockPanelShow.attr({
            title: "显示",
            "aria-hidden": "true"
        });
        dockPanelShow.click(function () {
            $(params.domNode).dndSource.show(params.domNode);
            dockItem.remove();
        });
        dockPanelShow.appendTo(dockPanelHeading);
        if ($.type(dockTo) == "object" && dockTo.length == 0) {
            var dockBar = $("<div id='dockBar'></div>").appendTo("body");
            dockBar.append(dockItem);
            dockTo = dockBar;
        } else {
            dockTo.append(dockItem);
        }
    };
    $.fn.dndSource.destroy = function (domNode) {
        var speed = this.options.speed;
        var flag = confirm("终止操作，确认关闭?");
        if (flag) {
            domNode.fadeOut(speed, function () {
                domNode.remove();
            });
        }
    };
})(jQuery);