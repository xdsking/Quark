//$(document).ready(function() {
function startDrawWhiteboard(){
    //连接服务器初始化
    var roomId = '222';
    var socket = io.connect('https://in.yunzis.com', {secure: true});
    //连接
    socket.on('connect', function() {
        //将绘图信息发送到服务器
        var obj = new Object;
        obj.roomId = roomId;
        socket.emit('join', obj);
    });
    //获取别人画的信息
    socket.on('show', function(data){
        //设置画布相关
        ctx.lineCap=data.lineCap;
        ctx.lineJoin=data.lineJoin;
        ctx.strokeStyle=data.strokeStyle;
        ctx.lineWidth=data.lineWidth;

        switch(data.drawType)
        {
        case 'curve':
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
            ctx.lineTo(data.new_x, data.new_y);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'line':
            if(data.mouse == 'mousedown'){
                var points = [data.l_begin_x, data.l_begin_y, data.l_begin_x, data.l_begin_y];
                    remoteLine = new fabric.Line(points, {
                    strokeWidth: data.lineWidth,
                    lineCap : data.lineCap,
                    clineJoin : data.lineJoin,
                    stroke: data.strokeStyle,
                });
                canvas_fabric.add(remoteLine);
            }else{
                remoteLine.set({x2: data.l_end_x, y2: data.l_end_y});
                canvas_fabric.renderAll();
            }
            break;
        case 'rect':
            if(data.mouse == 'mousedown'){
                remoteRect = new fabric.Rect({
                  left: data.left,
                  top: data.top,
                  fill: data.strokeStyle,
                  width: data.width,
                  height: data.height,
                  stroke: data.strokeStyle
                });
                canvas_fabric.add(remoteRect);
            }else{
                remoteRect.set({width: data.width, height: data.height});
                canvas_fabric.renderAll();
            }
            break;
        case 'circle':
            if(data.mouse == 'mousedown'){
                remoteCircle = new fabric.Circle({
                  left: data.left,
                  top: data.top,
                  fill: data.strokeStyle,
                  radius: data.radius,
                  stroke: data.strokeStyle
                });
                canvas_fabric.add(remoteCircle);
            }else{
                if(data.radius>=0.0)
                {
                    remoteCircle.set({radius: data.radius});
                }else{
                    remoteCircle.set({left:data.left,top:data.top,radius: -data.radius});
                }
                canvas_fabric.renderAll();
            }
            break;
        case 'ellipse':
            if(data.mouse == 'mousedown'){
                remoteEllipse = new fabric.Ellipse({
                  left: data.left,
                  top: data.top,
                  rx: data.rx,
                  ry: data.ry,
                  fill: data.strokeStyle,
                  stroke: data.strokeStyle
                });
                canvas_fabric.add(remoteEllipse);
            }else{
                remoteEllipse.set({left:data.left,top:data.top,
                    rx:data.rx,ry:data.ry});
                canvas_fabric.renderAll();
            }
            break;
        case 'recthollow':
            if(data.mouse == 'mousedown'){
                remoteRectHollow = new fabric.Rect({
                  left: data.left,
                  top: data.top,
                  fill: data.rgba,
                  width: data.width,
                  height: data.height,
                  stroke: data.strokeStyle,
                  strokeWidth: data.lineWidth
                });
                canvas_fabric.add(remoteRectHollow);
            }else{
                remoteRectHollow.set({width: data.width, height: data.height});
                canvas_fabric.renderAll();
            }
            break;
        case 'circlehollow':
            if(data.mouse == 'mousedown'){
                remoteCircleHollow = new fabric.Circle({
                  left: data.left,
                  top: data.top,
                  fill: data.rgba,
                  radius: data.radius,
                  stroke: data.strokeStyle,
                  strokeWidth: data.lineWidth
                });
                canvas_fabric.add(remoteCircleHollow);
            }else{
                if(data.radius>=0.0)
                {
                    remoteCircleHollow.set({radius: data.radius});
                }else{
                    remoteCircleHollow.set({left:data.left,top:data.top,radius: -data.radius});
                }
                canvas_fabric.renderAll();
            }
            break;
        case 'ellipsehollow':
            if(data.mouse == 'mousedown'){
                remoteEllipseHollow = new fabric.Ellipse({
                  left: data.left,
                  top: data.top,
                  rx: data.rx,
                  ry: data.ry,
                  fill: data.rgba,
                  stroke: data.strokeStyle,
                  strokeWidth: data.lineWidth
                });
                canvas_fabric.add(remoteEllipseHollow);
            }else{
                remoteEllipseHollow.set({left: data.left,top: data.top,
                    rx: data.rx,ry: data.ry});
                canvas_fabric.renderAll();
            }
            break;
        }

        //恢复到之前的画布
        ctx.lineCap=lineCap;
        ctx.lineJoin=lineJoin;
        ctx.strokeStyle=strokeStyle;
        ctx.lineWidth=lineWidth;
    });
    socket.on('clearCanvas', function(data){
        ctx.clearRect(0,0,myCanvasDrawCurve.width,myCanvasDrawCurve.height);
        canvas_fabric.clear().renderAll();
    });
    //绘画除轨迹外的其他形状所用的画布
    var canvas_fabric = new fabric.Canvas('myCanvas', { selection: false });
    //$('.canvas-container').css("width", '100%');
    //$('.canvas-container').css("height", '100%');
    //$('.upper-canvas').css("height", '100%');
    //$('.upper-canvas').css("height", '100%');
    $('.upper-canvas').css("background", 'none');
    var myLine,myRect,myCircle,myEllipse,myRectHollow,myCircleHollow,myEllipseHollow;
    var remoteLine,remoteRect,remoteCircle,remoteEllipse,remoteRectHollow,remoteCircleHollow,remoteEllipseHollow;
    /* 绘图相关设定*/
    var lineCap = 'round',
        lineJoin = 'round',
        strokeStyle = '#000000',
        lineWidth = 10,
        drawType = 'curve';
    var ifdrawing = false;
    //坐标相对偏移
    var offset, x, y, new_x, new_y;//曲线
    var rect_bx, rect_by;//矩形
    var circle_bx, circle_by;//圆形
    var ellipse_bx, ellipse_by;//椭圆
    // canvas 元素和图物件设定
    var myCanvasDrawCurve = document.getElementById('myCanvasDrawCurve');
    var ctx = myCanvasDrawCurve.getContext('2d');
    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
    ctx.strokeStyle = lineJoin;
    ctx.lineWidth = lineWidth;

    //鼠标在画布上按下的是处理
    $(document).on('mousedown', '.aww-canvas', function(e){
        console.log('mousedown');
        e.stopPropagation();
        $('.aww-menu-open').removeClass('aww-menu-open');
        e.preventDefault();
        offset = $(e.currentTarget).offset();
        ifdrawing = true;
        switch(drawType)
        {
        case 'curve':
            x = e.pageX - offset.left;
            y = e.pageY - offset.top;
            drawLine(x, y, x+1, y+1);
            sendSocketToserver('draw',drawType,{x:x,y:y,new_x:x+1,new_y:y+1});
            break;
        case 'line':
            var l_begin_x = e.pageX - offset.left;
            var l_begin_y = e.pageY - offset.top;
            var points = [l_begin_x, l_begin_y, l_begin_x, l_begin_y];
                myLine = new fabric.Line(points, {
                strokeWidth: lineWidth,
                lineCap : lineCap,
                clineJoin : lineJoin,
                stroke: strokeStyle,
            });
            canvas_fabric.add(myLine);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                l_begin_x:l_begin_x,l_begin_y:l_begin_y});
            break;
        case 'rect':
            rect_bx = e.pageX - offset.left;
            rect_by = e.pageY - offset.top;
            myRect = new fabric.Rect({
              left: rect_bx,
              top: rect_by,
              fill: strokeStyle,
              width: 1,
              height: 1,
              stroke: strokeStyle
            });
            canvas_fabric.add(myRect);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:rect_bx,top:rect_by,width: 1,height: 1});
            break;
        case 'circle':
            circle_bx = e.pageX - offset.left;
            circle_by = e.pageY - offset.top;
             myCircle= new fabric.Circle({
              radius: 1,
              left: circle_bx,
              top: circle_by,
              fill: strokeStyle,
              stroke: strokeStyle
            });
            canvas_fabric.add(myCircle);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:circle_bx,top:circle_by,radius:1});
            break;
        case 'ellipse':
            ellipse_bx = e.pageX - offset.left;
            ellipse_by = e.pageY - offset.top;
            myEllipse = new fabric.Ellipse({
              left: ellipse_bx,
              top: ellipse_by,
              fill: strokeStyle,
              rx: 1,
              ry: 1,
              stroke: strokeStyle
            });
            canvas_fabric.add(myEllipse);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:ellipse_bx,top:ellipse_by,rx: 1,ry: 1});
            break;
        case 'recthollow':
            rect_bx = e.pageX - offset.left;
            rect_by = e.pageY - offset.top;
            myRectHollow = new fabric.Rect({
              left: rect_bx,
              top: rect_by,
              fill: 'rgba(255,255,255,0.0)',
              width: 1,
              height: 1,
              stroke: strokeStyle,
              strokeWidth: lineWidth
            });
            canvas_fabric.add(myRectHollow);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:rect_bx,top:rect_by,width: 1,height: 1,rgba:'rgba(255,255,255,0.0)'});
            break;
        case 'circlehollow':
            circle_bx = e.pageX - offset.left;
            circle_by = e.pageY - offset.top;
             myCircleHollow= new fabric.Circle({
              radius: 1,
              left: circle_bx,
              top: circle_by,
              fill: 'rgba(255,255,255,0.0)',
              stroke: strokeStyle,
              strokeWidth: lineWidth
            });
            canvas_fabric.add(myCircleHollow);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:circle_bx,top:circle_by,radius:1,rgba:'rgba(255,255,255,0.0)'});
            break;
        case 'ellipsehollow':
            ellipse_bx = e.pageX - offset.left;
            ellipse_by = e.pageY - offset.top;
            myEllipseHollow = new fabric.Ellipse({
              left: ellipse_bx,
              top: ellipse_by,
              fill: 'rgba(255,255,255,0.0)',
              rx: 1,
              ry: 1,
              stroke: strokeStyle,
              strokeWidth: lineWidth
            });
            canvas_fabric.add(myEllipseHollow);
            sendSocketToserver('draw',drawType,{mouse:'mousedown',
                left:ellipse_bx,top:ellipse_by,rx: 1,ry: 1,rgba:'rgba(255,255,255,0.0)'});
            break;
        }
    });

    //鼠标在画布上按下并滑动时的是处理
    $(document).on('mousemove', '.aww-canvas', function(e){
        e.stopPropagation();
        console.log('mousemove');
        e.preventDefault();
        if(ifdrawing)
        {
            var offset_x = e.pageX - offset.left;
            var offset_y = e.pageY - offset.top;
            switch(drawType)
            {
            case 'curve':
                new_x = offset_x;
                new_y = offset_y;
                drawLine(x, y, new_x, new_y);
                sendSocketToserver('draw',drawType,{x:x,y:y,
                    new_x:new_x,new_y:new_y});
                x = new_x;
                y = new_y;
                break;
            case 'line':
                myLine.set({x2: offset_x, y2: offset_y});
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',
                    l_end_x:offset_x,l_end_y:offset_y});
                break;
            case 'rect':
                myRect.set({width: offset_x-rect_bx, height: offset_y-rect_by});
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',
                    width:offset_x-rect_bx,height:offset_y-rect_by});
                break;
            case 'circle':
                var r = (offset_x-circle_bx)/2.0;
                if(r>=0.0)
                {
                    myCircle.set({radius: (offset_x-circle_bx)/2.0});
                }else{
                    myCircle.set({left:offset_x,top:offset_y,radius: -(offset_x-circle_bx)/2.0});
                }
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',left:offset_x,
                    top:offset_y,radius: (offset_x-circle_bx)/2.0});
                break;
            case 'ellipse':
                var rx = (offset_x-ellipse_bx)/2.0;
                var ry = (offset_y-ellipse_by)/2.0;
                var left_tmp,top_tmp,rx_tmp,ry_tmp;
                if(rx<0){
                    left_tmp = offset_x;
                    rx_tmp =-rx;
                    myEllipse.set({left:offset_x,rx: -rx});
                }else{
                    left_tmp = ellipse_bx;
                    rx_tmp =rx;
                    myEllipse.set({left:ellipse_bx,rx: rx});
                }
                if(ry<0){
                    top_tmp=offset_y;
                    ry_tmp =-ry;
                    myEllipse.set({top:offset_y, ry: -ry});
                }else{
                    top_tmp = ellipse_by;
                    ry_tmp =ry;
                    myEllipse.set({top:ellipse_by, ry: ry});
                }
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',
                    left:left_tmp,top:top_tmp,rx:rx_tmp,ry:ry_tmp});
                break;
            case 'recthollow':
                myRectHollow.set({width: offset_x-rect_bx, height: offset_y-rect_by});
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',
                    width:offset_x-rect_bx,height:offset_y-rect_by});
                break;
            case 'circlehollow':
                var r = (offset_x-circle_bx)/2.0;
                if(r>=0.0)
                {
                    myCircleHollow.set({radius: (offset_x-circle_bx)/2.0});
                }else{
                    myCircleHollow.set({left:offset_x,top:offset_y,radius: -(offset_x-circle_bx)/2.0});
                }
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',left:offset_x,
                    top:offset_y,radius: (offset_x-circle_bx)/2.0});
                break;
            case 'ellipsehollow':
                var rx = (offset_x-ellipse_bx)/2.0;
                var ry = (offset_y-ellipse_by)/2.0;
                var left_tmp,top_tmp,rx_tmp,ry_tmp;
                if(rx<0){
                    left_tmp = offset_x;
                    rx_tmp =-rx;
                }else{
                    left_tmp = ellipse_bx;
                    rx_tmp =rx;
                }
                if(ry<0){
                    top_tmp=offset_y;
                    ry_tmp =-ry;
                }else{
                    top_tmp = ellipse_by;
                    ry_tmp =ry;
                }
                myEllipseHollow.set({left:left_tmp,top:top_tmp,rx:rx_tmp,ry:ry_tmp});
                canvas_fabric.renderAll();
                sendSocketToserver('draw',drawType,{mouse:'mousemove',
                    left:left_tmp,top:top_tmp,rx:rx_tmp,ry:ry_tmp});
                break;
            }
        }
    });

    //鼠标
    $(document).on('mouseup', '.aww-canvas', function(e){
        e.preventDefault();
        if(ifdrawing)
        {
            ifdrawing = false;
        }
    });
    //清除画布
    $(document).on('click','.aww-clear-canvas',function(e){
        ctx.clearRect(0,0,myCanvasDrawCurve.width,myCanvasDrawCurve.height);
        canvas_fabric.clear().renderAll();
        socket.emit('clearCanvas', {roomId:roomId});
    });
    //选择画笔颜色
    $(document).on('click', '.aww-color-icon', function(e){
        strokeStyle = $(this).css('background-color');
        ctx.strokeStyle = strokeStyle;
    });
    //选择笔尖的大小
    $(document).on('click', '.aww-pen-size', function(e){
        lineWidth = Number($(this).data('size'));
        ctx.lineWidth =lineWidth;
    });
    //选择绘画形状
    $(document).on('click', '.aww-draw-type', function(e){
        console.log($(this).data('drawtype'));
        drawType = $(this).data('drawtype');
    });

    //划线
    function drawLine(x, y, new_x, new_y)
    {
        //绘图
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(new_x, new_y);
        ctx.closePath();
        ctx.stroke();
    }
    function sendSocketToserver(msgType,drawType,drawData)
    {
        var obj = new Object;

        switch(drawType)
        {
        case 'curve':
            obj.x = drawData.x;
            obj.y = drawData.y;
            obj.new_x = drawData.new_x;
            obj.new_y = drawData.new_y;
            break;
        case 'line':
            obj.mouse = drawData.mouse;
            if(obj.mouse == 'mousedown')
            {
                obj.l_begin_x= drawData.l_begin_x;
                obj.l_begin_y= drawData.l_begin_y;
            }else{
                obj.l_end_x= drawData.l_end_x;
                obj.l_end_y= drawData.l_end_y;
            }
            break;
        case 'rect':
            obj.mouse = drawData.mouse;
            if(obj.mouse == 'mousedown')
            {
                obj.left= drawData.left;
                obj.top= drawData.top;
                obj.width= drawData.width;
                obj.height= drawData.height;
            }else{
                obj.width= drawData.width;
                obj.height= drawData.height;
            }
            break;
        case 'circle':
            obj.mouse = drawData.mouse;
            obj.left= drawData.left;
            obj.top= drawData.top;
            obj.radius= drawData.radius;
            break;
        case 'ellipse':
            obj.mouse = drawData.mouse;
            obj.left= drawData.left;
            obj.top= drawData.top;
            obj.rx= drawData.rx;
            obj.ry= drawData.ry;
            break;
        case 'recthollow':
            obj.mouse = drawData.mouse;
            if(obj.mouse == 'mousedown')
            {
                obj.left= drawData.left;
                obj.top= drawData.top;
                obj.width= drawData.width;
                obj.height= drawData.height;
                obj.rgba = drawData.rgba;
            }else{
                obj.width= drawData.width;
                obj.height= drawData.height;
            }
            break;
        case 'circlehollow':
            obj.mouse = drawData.mouse;
            obj.left= drawData.left;
            obj.top= drawData.top;
            obj.radius= drawData.radius;
            obj.rgba = drawData.rgba;
            break;
        case 'ellipsehollow':
            obj.mouse = drawData.mouse;
            obj.left= drawData.left;
            obj.top= drawData.top;
            obj.rx= drawData.rx;
            obj.ry= drawData.ry;
            obj.rgba = drawData.rgba;
            break;
        }
        obj.lineCap=ctx.lineCap;
        obj.lineJoin=ctx.lineJoin;
        obj.strokeStyle=ctx.strokeStyle;
        obj.lineWidth=ctx.lineWidth;
        obj.roomId = roomId;
        obj.drawType = drawType;
        socket.emit(msgType, obj);
    }
}
//});