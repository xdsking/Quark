/**
 * Created by xuds on 2015/5/18.
 */
(function($){
    $.fn.modalDialog=function(params){
        if (this.children().length > 0) {
            return this.children();
        }
        var options = $.fn.modalDialog.options = {

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
        var modalBody=$("<div></div>");
        modalBody.addClass("modal-body cstm-modal-body");
        modalDialog.append(modalBody);
        var closeVideoDialogButton=$("<button></button>");
        closeVideoDialogButton.addClass("close closeVideoDialog");
        closeVideoDialogButton.attr({
            type:"button"
        });
        closeVideoDialogButton.html("&times;");
        modalBody.append(closeVideoDialogButton);
        modal.modal({
            keyboard: false,
            backdrop: "static",
            show: false
        });
        modal.on('show.bs.modal', function (e) {
            modal.fadeIn(300);
            //TODO
        });
        closeVideoDialogButton.click(function () {
            if (confirm("确认关闭?")) {
                modal.modal("hide");
            }
        });
        return modal;
    }
})(jQuery);