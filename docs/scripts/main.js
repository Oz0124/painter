"use strict";var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.PainterComponent=function(e,t){var n=OO.Modules.PainterComponent.prototype._init,a=n(e,t);this.clearCanvas=a.clearCanvas,this.undo=a.undo,this.saveCanvas=a.saveCanvas},OO.Modules.PainterComponent.prototype._init=function(e,t){var n=t.style("width"),a=t.style("height"),o=t.append("canvas").attr("class","painter-canvas").style("width",n).style("height",a).attr("width",n).attr("height",a),l=t.append("a").attr("download","my-painter.jpg").style("display","none");"undefined"!=typeof G_vmlCanvasManager&&(o=G_vmlCanvasManager.initElement(o));var d=o.node().getContext("2d");d.fillStyle="white",d.fillRect(0,0,o.node().width,o.node().height);var i=0,r=0,c=0,s=0,u=function(e,t){this.x=e,this.y=t},p=function(t,n){d.strokeStyle=e.selectItem.penColor,d.lineWidth=e.selectItem.penWidth,d.lineCap="round",d.beginPath(),d.moveTo(t.x,t.y),d.lineTo(n.x,n.y),d.stroke(),d.closePath()},v=function(e,t){0===i?(c=e,s=t,i=1):3===i&&(c=e,s=t,i=4),r=0},h=function(t,n){1!==i&&2!==i&&4!==i||(r=0,t===c&&n===s||(p(new u(c,s),new u(t,n)),1!==i&&4!==i||e.pointArray.push(new u(c,s)),e.pointArray.push(new u(t,n)),c=t,s=n),i=2)},f=function(t,n){2===i||4===i?(t===c&&n===s||(e.pointArray.push(new u(t,n)),p(new u(c,s),new u(t,n))),e.pointArray.push(new u(-1,-1)),c=t,s=n,i=3,r=1):i=0},O=function(){2===i&&(e.pointArray.push(new u(-1,-1)),r=1,i=3)},y=function(e,t){return!(e.x<0||e.y<0||e.x>t.width||e.y>t.height)},m=function(){i=0,r=0,d.clearRect(0,0,o.node().width,o.node().height),d.fillStyle="#ffffff",d.fillRect(0,0,o.node().width,o.node().height),e.pointArray=[]},g=function(){var t=-1,n=-1,a=-1,l=-1,i=0,r=0;for(d.clearRect(0,0,o.node().width,o.node().height),d.fillStyle="#ffffff",d.fillRect(0,0,o.node().width,o.node().height),i=0,r=e.pointArray.length;i<r;i++)a=e.pointArray[i].x,l=e.pointArray[i].y,a>=0?t>=0?p(new u(t,n),new u(a,l)):p(new u(a,l),new u(a,l)):t>=0&&p(new u(t,n),new u(t,n)),t=a,n=l},w=function(){var t=0,n=-1,a=[],o=0,l=0;for(o=0,l=e.pointArray.length;o<l;o++)e.pointArray[e.pointArray.length-o-1].x<0&&2===++t&&(n=e.pointArray.length-o-1);if(n>0){for(o=0;o<=n;o++)a.push(e.pointArray[o]);e.pointArray=a}else e.pointArray=[];g()},C=function(){var e=o.node().toDataURL("image/jpeg");l.attr("href",e),l.node().click(),m()};return o.on("mousedown",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.clientX-Math.round(e.left),n=d3.event.clientY-Math.round(e.top);v(t,n)}),o.on("mousemove",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.clientX-Math.round(e.left),n=d3.event.clientY-Math.round(e.top);h(t,n)}),o.on("mouseup",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.clientX-Math.round(e.left),n=d3.event.clientY-Math.round(e.top);f(t,n)}),o.on("mouseleave",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,O()}),o.on("touchstart",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],n=t.clientX-Math.round(e.left),a=t.clientY-Math.round(e.top);v(n,a)}),o.on("touchmove",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],n=t.clientX-Math.round(e.left),a=t.clientY-Math.round(e.top);y(new u(n,a),e)?h(n,a):O()}),o.on("touchend",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=o.node().getBoundingClientRect(),t=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],n=t.clientX-Math.round(e.left),a=t.clientY-Math.round(e.top);f(n,a)}),window.onresize=function(e){var n=t.style("width"),a=t.style("height");o.style("width",n).style("height",a).attr("width",n).attr("height",a)},{clearCanvas:m,undo:w,saveCanvas:C}};var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.SideMenuComponent=function(e,t){(0,OO.Modules.SideMenuComponent.prototype._init)(e,t),this.openNav=function(){d3.select("body").select(".side-nav .side-nav-container").style("width"),d3.select("body").select(".side-nav").style("width","100%")},this.closeNav=function(){d3.select("body").select(".side-nav").style("width","0")}},OO.Modules.SideMenuComponent.prototype._init=function(e,t){var n=t.append("div").attr("class","side-nav"),a=n.append("div").attr("class","side-nav-container");a.append("div").attr("class","close-button").text("×");var o=a.append("div").attr("class","nav-item pallete");o.append("div").attr("class","title").text("Pen color"),o.selectAll("option").data(e.penColor).enter().append("div").attr("class",function(t){var n="option";return e.selectItem.penColor===t&&(n+=" active"),n}).style("background-color",function(e){return e}).on("click",function(t){e.selectItem.penColor=t,o.selectAll(".option").classed("active",!1),d3.select(this).classed("active",!0)});var l=a.append("div").attr("class","nav-item pen-width");l.append("div").attr("class","title").text("Pen width"),l.selectAll("option").data(e.penWidth).enter().append("div").attr("class",function(t){var n="option";return e.selectItem.penWidth===t&&(n+=" active"),n}).on("click",function(t){e.selectItem.penWidth=t,l.selectAll(".option").classed("active",!1),d3.select(this).classed("active",!0)}).append("div").style("background-color","#ffffff").style("width",function(e){return e+"px"}).style("height",function(e){return e+"px"}).style("margin","0 auto"),a.append("div").attr("class","nav-item click-button").text("Undo").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.undoCallback&&e.undoCallback()}),a.append("div").attr("class","nav-item click-button").text("Clean").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.clearCallback&&e.clearCallback()}),a.append("div").attr("class","nav-item click-button").text("Save as file").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.saveFileCallback&&e.saveFileCallback()})};var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.ModalComponent=function(e,t){var n=OO.Modules.ModalComponent.prototype._init,a=n(e,t);this.show=a.show},OO.Modules.ModalComponent.prototype._init=function(e,t){var n=t.append("div").attr("class","modal fade"),a=n.append("div").attr("class","modal-dialog"),o=a.append("div").attr("class","modal-content"),l=o.append("div").attr("class","modal-header");return l.append("button").attr("type","button").attr("class","close").attr("data-dismiss","modal").append("span").attr("aria-hidden","true").text("×"),l.append("h4").attr("class","modal-title"),o.append("div").attr("class","modal-body"),o.append("div").attr("class","modal-footer").append("button").attr("type","button").attr("class","btn btn-default").attr("data-dismiss","modal").text("OK"),{show:function(e,t){l.select(".modal-title").text(e),o.select(".modal-body").text(t),$(n.node()).modal("show")}}};var OO=OO||{};OO.Data=OO.Data||{},$(document).ready(function(){var e=d3.select("body"),t=d3.select("body").select(".main"),n=null,a=null,o=null,l=["red","orange","yellow","green","blue","indigo","purple","black","white"],d=[1,2,3,4,5,6,7,8,9];OO.Data.selectItem={penColor:l[0],penWidth:d[0]},a=new OO.Modules.PainterComponent({selectItem:OO.Data.selectItem,pointArray:[]},t),n=new OO.Modules.SideMenuComponent({penColor:l,penWidth:d,selectItem:OO.Data.selectItem,saveFileCallback:function(){a.saveCanvas()},undoCallback:function(){a.undo()},clearCallback:function(){a.clearCanvas()}},e),o=new OO.Modules.ModalComponent({},e),OO.Data.sideMenuComponent=n,OO.Data.painterComponent=a,OO.Data.modalComponent=o,o.show("Information","White area can be drawn!"),$("body").on("click",".top-nav .sideMenuButton",function(e){e.preventDefault(),n.openNav()}),$("body").on("click",".side-nav .close-button",function(e){n.closeNav()})});