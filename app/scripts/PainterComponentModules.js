// painter component
var OO = OO || {};
OO.Modules = OO.Modules || {};

OO.Modules.PainterComponent = function(options, container) {
	let _init = OO.Modules.PainterComponent.prototype._init;
	let methods = _init(options, container);

	this.clearCanvas = methods.clearCanvas;
   	this.undo = methods.undo;
   	this.saveCanvas = methods.saveCanvas;
};


// 初始化element
OO.Modules.PainterComponent.prototype._init = function (options, container) {
	let containerWidth = container.style('width');
	let containerHeight = container.style('height');

	let painterCanvas = container.append('canvas').attr('class', 'painter-canvas')
		.style('width', containerWidth).style('height', containerHeight)
		.attr('width', containerWidth).attr('height', containerHeight);

	let download = container.append('a').attr('download', 'my-painter.jpg').style('display', 'none');

	if (typeof G_vmlCanvasManager !== 'undefined') {
		painterCanvas = G_vmlCanvasManager.initElement(painterCanvas);
	}

	let painterContext = painterCanvas.node().getContext('2d');
	painterContext.fillStyle = 'white';
	painterContext.fillRect(0, 0, painterCanvas.node().width, painterCanvas.node().height);

	let nowState = 0;
    let mouseUpFlag = 0;
    let lastX = 0;
    let lastY = 0;

    //點的結構
    let Point = function(x, y, color, width, type) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.pointType = type;
    };

	//畫出筆跡
    //from: 起點, Point物件
    //to: 終點, Point物件
    let paint = function(from, to) {
        painterContext.strokeStyle = from.color;
        painterContext.lineWidth = from.width;
        painterContext.lineCap = 'round';

        painterContext.beginPath();
        painterContext.moveTo(from.x, from.y);
        painterContext.lineTo(to.x, to.y);
        painterContext.stroke();
        painterContext.closePath();
    };
	

	//處理mousedown與touchstart
    let mouseDown = function(mouseX, mouseY) {

        if (nowState === 0) {
            lastX = mouseX;
            lastY = mouseY;
            nowState = 1;
        } 
        else if (nowState === 3) {
            lastX = mouseX;
            lastY = mouseY;
            nowState = 4;
        }

        mouseUpFlag = 0;

    };

    //處理mousemove與touchmove
    let mouseMove = function(mouseX, mouseY, color, width, type) {

        if ((nowState === 1) || (nowState === 2) || (nowState === 4)) {
            mouseUpFlag = 0;

            if ((mouseX === lastX) && (mouseY === lastY)) {
                //do nothing
            } 
            else {
                paint(new Point(lastX, lastY, color, width, type), new Point(mouseX, mouseY, color, width, type));

                //記錄落筆點
                if ((nowState === 1) || (nowState === 4)) {
                    options.pointArray.push(new Point(lastX, lastY, color, width, type));
                }
                options.pointArray.push(new Point(mouseX, mouseY, color, width, type));

                lastX = mouseX;
                lastY = mouseY;
            }

            nowState = 2;
        }

    };

    //處理mouseup與touchend
    let mouseUp = function(mouseX, mouseY, color, width, type) {

        if ((nowState === 2) || (nowState === 4)) {
            if ((mouseX === lastX) && (mouseY === lastY)) {
                //do nothing
            } 
            else {
                options.pointArray.push(new Point(mouseX, mouseY, color, width, type));

                paint(new Point(lastX, lastY, color, width, type), new Point(mouseX, mouseY, color, width, type));
            }
            options.pointArray.push(new Point(-1, -1, color, width, type));

            lastX = mouseX;
            lastY = mouseY;
            nowState = 3;

            mouseUpFlag = 1;
        } 
        else {
            nowState = 0;
        }
    };

    //處理mouseleave
    //touchleave的行為在現代的瀏覽器仍不存在
    //因此是以判斷目前的手指點在哪裡來判斷是不是有移出區域
    //並觸發相關狀態改變
    let mouseLeave = function() {

        //只有mousemove的情形要將筆跡終止
        if (nowState === 2) {
            options.pointArray.push(new Point(-1, -1, null, null, null));
            mouseUpFlag = 1;
            nowState = 3;    
        }
    };

    //測試目前手指觸碰位置是否在區域中
    let pointInRect = function(point, rect) {

        if (((point.x < 0) || (point.y <0)) || 
            ((point.x > rect.width) || (point.y > rect.height))) {
            return false;
        } 
        return true;
    };

    // function
    let clearCanvas = function () {
    	nowState = 0;
        mouseUpFlag = 0;
        painterContext.clearRect(0, 0, painterCanvas.node().width, painterCanvas.node().height);
        painterContext.fillStyle = '#ffffff';
		painterContext.fillRect(0, 0, painterCanvas.node().width, painterCanvas.node().height);

        options.pointArray.length = 0;
    };

    //重新繪製
    let redraw = function() {
        let tmpLastX = -1;
        let tmpLastY = -1;
        let tmpCurrentX = -1;
        let tmpCurrentY = -1;
        let tmoColor = null;
        let tmpWidth = null;
        let tmpType = null;
        let i = 0;
        let len = 0;

        painterContext.clearRect(0, 0, painterCanvas.node().width, painterCanvas.node().height);
        painterContext.fillStyle = '#ffffff';
		painterContext.fillRect(0, 0, painterCanvas.node().width, painterCanvas.node().height);

        for (i = 0, len = options.pointArray.length; i < len; i++) {
            tmpCurrentX = options.pointArray[i].x;
            tmpCurrentY = options.pointArray[i].y;
            tmoColor = options.pointArray[i].color;
            tmpWidth = options.pointArray[i].width;
            tmpType = options.pointArray[i].pointType;

            if (tmpCurrentX >= 0) {
                if (tmpLastX >= 0) {
                    paint(new Point(tmpLastX, tmpLastY, tmoColor, tmpWidth, tmpType), new Point(tmpCurrentX, tmpCurrentY, tmoColor, tmpWidth, tmpType));
                } 
                else {
                    paint(new Point(tmpCurrentX, tmpCurrentY, tmoColor, tmpWidth, tmpType), new Point(tmpCurrentX, tmpCurrentY, tmoColor, tmpWidth, tmpType));
                }
            } 
            else if (tmpLastX >= 0) {
                paint(new Point(tmpLastX, tmpLastY, tmoColor, tmpWidth, tmpType), new Point(tmpLastX, tmpLastY, tmoColor, tmpWidth, tmpType));
            }

            tmpLastX = tmpCurrentX;
            tmpLastY = tmpCurrentY;
        }
    };

    //上一步
    let undo = function() {
        let iCounter = 0;
        let lastIndex = -1;
        let tmpArray = [];
        let i = 0;
        let len = 0;

        for (i = 0, len = options.pointArray.length; i < len; i++) {
            if (options.pointArray[options.pointArray.length - i - 1].x < 0) {
                iCounter++;
                if (iCounter === 2) {
                    lastIndex = options.pointArray.length - i - 1;
                }
            }
        }

        if (lastIndex > 0) {
            for (i = 0; i <= lastIndex; i++) {
                tmpArray.push(options.pointArray[i]);
            }

            options.pointArray.length = 0;
            tmpArray.forEach(function (item) {
                console.log(item);

                options.pointArray.push(item);
            });
        } 
        else {
            options.pointArray.length = 0;
        }

        redraw();
    };

    let saveCanvas =  function () {
    	let url = painterCanvas.node().toDataURL('image/jpeg');
        let date = new Date();

        let dateString = date.getFullYear() + '';
        dateString += (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        dateString += date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate() + '-';
        dateString += date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
        dateString += date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
        dateString += date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();     

        download.attr('download', 'my-painter-' + dateString + '.jpg');
    	download.attr('href', url);
    	download.node().click();

    	redraw();
    };

	//Binding Mouse Events
    painterCanvas.on('mousedown', function() {

		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

		let rect = painterCanvas.node().getBoundingClientRect();
		let mouseX = d3.event.clientX - Math.round(rect.left);
		let mouseY = d3.event.clientY - Math.round(rect.top);

		mouseDown(mouseX, mouseY);
	});
	
	painterCanvas.on('mousemove', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

		let rect = painterCanvas.node().getBoundingClientRect();
        let mouseX = d3.event.clientX - Math.round(rect.left);
        let mouseY = d3.event.clientY - Math.round(rect.top);

        mouseMove(mouseX, mouseY, options.selectItem.penColor, options.selectItem.penWidth, OO.Common.ENUM.PointType.Point);
	});
	painterCanvas.on('mouseup', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);
		
		let rect = painterCanvas.node().getBoundingClientRect();
		let mouseX = d3.event.clientX - Math.round(rect.left);
		let mouseY = d3.event.clientY - Math.round(rect.top);

		mouseUp(mouseX, mouseY, options.selectItem.penColor, options.selectItem.penWidth, OO.Common.ENUM.PointType.Point);
	});
	painterCanvas.on('mouseleave', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

		mouseLeave();
    });

	//Binding Touch Events
	painterCanvas.on('touchstart', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);
                  
        let rect = painterCanvas.node().getBoundingClientRect();
        let touch = d3.event.targetTouches[0] ? d3.event.targetTouches[0] : d3.event.changedTouches[0];
        let mouseX = touch.clientX - Math.round(rect.left);
        let mouseY = touch.clientY - Math.round(rect.top);

        mouseDown(mouseX, mouseY);
	});
    painterCanvas.on('touchmove', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

		let rect = painterCanvas.node().getBoundingClientRect();
        let touch = d3.event.targetTouches[0] ? d3.event.targetTouches[0] : d3.event.changedTouches[0];
        let mouseX = touch.clientX - Math.round(rect.left);
        let mouseY = touch.clientY - Math.round(rect.top);

        if (pointInRect(new Point(mouseX, mouseY, null, null, null), rect)) {
            mouseMove(mouseX, mouseY, options.selectItem.penColor, options.selectItem.penWidth, OO.Common.ENUM.PointType.Point);
        } 
        else {
            mouseLeave();
        }
	});
    painterCanvas.on('touchend', function() {
		d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

        let rect = painterCanvas.node().getBoundingClientRect();
        let touch = d3.event.targetTouches[0] ? d3.event.targetTouches[0] : d3.event.changedTouches[0];
        let mouseX = touch.clientX - Math.round(rect.left);
        let mouseY = touch.clientY - Math.round(rect.top);

        mouseUp(mouseX, mouseY, options.selectItem.penColor, options.selectItem.penWidth, OO.Common.ENUM.PointType.Point);
    });

    window.onresize = function(event) {
    	let containerWidth = container.style('width');
		let containerHeight = container.style('height');

    	painterCanvas.style('width', containerWidth).style('height', containerHeight)
			.attr('width', containerWidth).attr('height', containerHeight);

        redraw();
	};

    return {
    	clearCanvas: clearCanvas,
    	undo: undo,
    	saveCanvas: saveCanvas
    };
    
};

