/**
 * Created by Administrator on 2015/6/4.
 */

var whiteboard_htmlConext = $('#whiteboardPanel').clone(true,true);
function openWhiteBoard()
{
    if(IsPC()){
        var content=whiteboard_htmlConext;
        if($('#whiteboardPanel').length>0){
            content=$('#whiteboardPanel');
        }
        var dragNode=$("#dndSource");
        var dndSourceNode=dragNode.dndSource({
            title: "白板窗口",
            id:"dndSource",
            theme: "info",
            maxable: true,
            closable: true,
            dockable: true,
            resizable: true,
            content:content,/*必设参数*/
            dockTo: $("#dockBar"),
            style: "width: 800px;position: absolute;top: 100px;left: 100px;display: none;padding: 0px;"
        });
        dragNode.dndSource.show(dndSourceNode);
        startDrawWhiteboard();
    }else{
        //移动端切换面板
        showOperatePanel({title:"白板窗口"});
        //TODO
        startDrawWhiteboard();
    }
}