/**
 * Created by xuds on 2015/5/18.
 */
(function($){
    $.fn.modalDialog=function(params){
        var self=this;
        if (this.children().length > 0) {
            return this.children();
        }
        var options = $.fn.modalDialog.options = {
            speed: 500
        };
        var modal = $("<div></div>");
        modal.addClass("modal");
        modal.attr({
            //id: options.id,
            tabindex:"-1",
            role:"dialog",
            "aria-hidden":true
        });
        this.append(modal);
        var modalDialog= $("<div></div>");
        modalDialog.addClass("modal-dialog cstm-modal-dialog");
        $.extend(options, params);
        var alignCenter=function(){
            if(options.style&&typeof options.style=="object"){
                var modalStyle=options.style;
                return {
                    "width":modalStyle.width+"px",
                    "height":modalStyle.height+"px",
                    "margin-left":(-modalStyle.width/2)+"px",
                    "margin-top":(-modalStyle.height/2)+"px"};
            }
        };
        modalDialog.css(alignCenter());
        modal.append(modalDialog);
        //向左翻页
        var  glyphiconMenuLeft=$.fn.modalDialog.glyphiconMenuLeft=$('<span class="glyphicon glyphicon-menu-left cstm-glyphicon-menu-left" aria-hidden="true"></span>');
        glyphiconMenuLeft.css({
            top:((options.style.height-100)/2)+"px"
        });
        modalDialog.append(glyphiconMenuLeft);
        var modalBody=$.fn.modalDialog.modalBody=$("<div></div>");
        modalBody.addClass("modal-body cstm-modal-body");
        modalDialog.append(modalBody);
        var closeVideoDialogButton=$("<button></button>");
        closeVideoDialogButton.addClass("close closeVideoDialog");
        closeVideoDialogButton.attr({
            type:"button"
        });
        closeVideoDialogButton.html("&times;");
        modalBody.append(closeVideoDialogButton);
        //向右翻页
        var  glyphiconMenuRight=$.fn.modalDialog.glyphiconMenuRight=$('<span class="glyphicon glyphicon-menu-right cstm-glyphicon-menu-right" aria-hidden="true"></span>');
        glyphiconMenuRight.css({
            top:((options.style.height-100)/2)+"px"
        });
        modalDialog.append(glyphiconMenuRight);
        modal.modal({
            keyboard: false,
            backdrop: "static",
            show: false
        });
        modal.on('show.bs.modal', function (e) {
            modal.fadeIn(options.speed);
            //TODO
        });
        closeVideoDialogButton.click(function () {
            $(self).modalDialog.destroy(modal);
            /*if (confirm("确认关闭?")) {
                modal.remove();
                //modal.modal("hide");
            }*/
        });
        return modal;
    };
    $.fn.modalDialog.destroy = function (domNode) {
        var speed = 200;//this.options.speed;
        var flag = confirm("确认关闭?");
        if(flag){
            domNode.fadeOut(speed,function () {
                domNode.remove();
            });
        }
        return flag;
    };
    $.fn.modalDialog.getLeftMenu=function(){
        return this.glyphiconMenuLeft;
    };
    $.fn.modalDialog.getRightMenu=function(){
        return this.glyphiconMenuRight;
    };
    $.fn.modalDialog.getModalBody=function(){
        return this.modalBody;
    };
})(jQuery);