"use strict";var OO=OO||{};!function(){OO.Common=OO.Common||{},OO.Common.ENUM={PointType:{Point:1,Circle:2,Rect:3}}}();var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.PainterComponent=function(e,t){var n=OO.Modules.PainterComponent.prototype._init,o=n(e,t);this.clearCanvas=o.clearCanvas,this.undo=o.undo,this.saveCanvas=o.saveCanvas},OO.Modules.PainterComponent.prototype._init=function(e,t){var n=t.style("width"),o=t.style("height"),a=t.append("canvas").attr("class","painter-canvas").style("width",n).style("height",o).attr("width",n).attr("height",o),l=t.append("a").attr("download","my-painter.jpg").style("display","none");"undefined"!=typeof G_vmlCanvasManager&&(a=G_vmlCanvasManager.initElement(a));var i=a.node().getContext("2d");i.fillStyle="white",i.fillRect(0,0,a.node().width,a.node().height);var d=0,r=0,c=0,s=0,u=function(e,t,n,o,a){this.x=e,this.y=t,this.color=n,this.width=o,this.pointType=a},p=function(e,t){i.strokeStyle=e.color,i.lineWidth=e.width,i.lineCap="round",i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.stroke(),i.closePath()},v=function(e,t){0===d?(c=e,s=t,d=1):3===d&&(c=e,s=t,d=4),r=0},h=function(t,n,o,a,l){1!==d&&2!==d&&4!==d||(r=0,t===c&&n===s||(p(new u(c,s,o,a,l),new u(t,n,o,a,l)),1!==d&&4!==d||e.pointArray.push(new u(c,s,o,a,l)),e.pointArray.push(new u(t,n,o,a,l)),c=t,s=n),d=2)},f=function(t,n,o,a,l){2===d||4===d?(t===c&&n===s||(e.pointArray.push(new u(t,n,o,a,l)),p(new u(c,s,o,a,l),new u(t,n,o,a,l))),e.pointArray.push(new u(-1,-1,o,a,l)),c=t,s=n,d=3,r=1):d=0},O=function(){2===d&&(e.pointArray.push(new u(-1,-1,null,null,null)),r=1,d=3)},m=function(e,t){return!(e.x<0||e.y<0||e.x>t.width||e.y>t.height)},y=function(){d=0,r=0,i.clearRect(0,0,a.node().width,a.node().height),i.fillStyle="#ffffff",i.fillRect(0,0,a.node().width,a.node().height),e.pointArray.length=0},g=function(){var t=-1,n=-1,o=-1,l=-1,d=null,r=null,c=null,s=0,v=0;for(i.clearRect(0,0,a.node().width,a.node().height),i.fillStyle="#ffffff",i.fillRect(0,0,a.node().width,a.node().height),s=0,v=e.pointArray.length;s<v;s++)o=e.pointArray[s].x,l=e.pointArray[s].y,d=e.pointArray[s].color,r=e.pointArray[s].width,c=e.pointArray[s].pointType,o>=0?t>=0?p(new u(t,n,d,r,c),new u(o,l,d,r,c)):p(new u(o,l,d,r,c),new u(o,l,d,r,c)):t>=0&&p(new u(t,n,d,r,c),new u(t,n,d,r,c)),t=o,n=l},C=function(){var t=0,n=-1,o=[],a=0,l=0;for(a=0,l=e.pointArray.length;a<l;a++)e.pointArray[e.pointArray.length-a-1].x<0&&2===++t&&(n=e.pointArray.length-a-1);if(n>0){for(a=0;a<=n;a++)o.push(e.pointArray[a]);e.pointArray.length=0,o.forEach(function(t){e.pointArray.push(t)})}else e.pointArray.length=0;g()},w=function(){var e=a.node().toDataURL("image/jpeg"),t=new Date,n=t.getFullYear()+"";n+=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,n+=t.getDate()<10?"0"+t.getDate():t.getDate()+"-",n+=t.getHours()<10?"0"+t.getHours():t.getHours(),n+=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),n+=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds(),l.attr("download","my-painter-"+n+".jpg"),l.attr("href",e),l.node().click(),g()};return a.on("mousedown",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=a.node().getBoundingClientRect(),t=d3.event.clientX-Math.round(e.left),n=d3.event.clientY-Math.round(e.top);v(t,n)}),a.on("mousemove",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var t=a.node().getBoundingClientRect(),n=d3.event.clientX-Math.round(t.left),o=d3.event.clientY-Math.round(t.top);h(n,o,e.selectItem.penColor,e.selectItem.penWidth,OO.Common.ENUM.PointType.Point)}),a.on("mouseup",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var t=a.node().getBoundingClientRect(),n=d3.event.clientX-Math.round(t.left),o=d3.event.clientY-Math.round(t.top);f(n,o,e.selectItem.penColor,e.selectItem.penWidth,OO.Common.ENUM.PointType.Point)}),a.on("mouseleave",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,O()}),a.on("touchstart",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var e=a.node().getBoundingClientRect(),t=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],n=t.clientX-Math.round(e.left),o=t.clientY-Math.round(e.top);v(n,o)}),a.on("touchmove",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var t=a.node().getBoundingClientRect(),n=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],o=n.clientX-Math.round(t.left),l=n.clientY-Math.round(t.top);m(new u(o,l,null,null,null),t)?h(o,l,e.selectItem.penColor,e.selectItem.penWidth,OO.Common.ENUM.PointType.Point):O()}),a.on("touchend",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1;var t=a.node().getBoundingClientRect(),n=d3.event.targetTouches[0]?d3.event.targetTouches[0]:d3.event.changedTouches[0],o=n.clientX-Math.round(t.left),l=n.clientY-Math.round(t.top);f(o,l,e.selectItem.penColor,e.selectItem.penWidth,OO.Common.ENUM.PointType.Point)}),window.onresize=function(e){var n=t.style("width"),o=t.style("height");a.style("width",n).style("height",o).attr("width",n).attr("height",o),g()},{clearCanvas:y,undo:C,saveCanvas:w}};var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.SideMenuComponent=function(e,t){(0,OO.Modules.SideMenuComponent.prototype._init)(e,t),this.openNav=function(){d3.select("body").select(".side-nav .side-nav-container").style("width"),d3.select("body").select(".side-nav").style("width","100%")},this.closeNav=function(){d3.select("body").select(".side-nav").style("width","0")}},OO.Modules.SideMenuComponent.prototype._init=function(e,t){var n=t.append("div").attr("class","side-nav"),o=n.append("div").attr("class","side-nav-container");o.append("div").attr("class","close-button").text("×");var a=o.append("div").attr("class","nav-item pallete");a.append("div").attr("class","title").text("Pen color"),a.selectAll("option").data(e.penColor).enter().append("div").attr("class",function(t){var n="option";return e.selectItem.penColor===t&&(n+=" active"),n}).style("background-color",function(e){return e}).on("click",function(t){e.selectItem.penColor=t,a.selectAll(".option").classed("active",!1),d3.select(this).classed("active",!0)});var l=o.append("div").attr("class","nav-item pen-width");l.append("div").attr("class","title").text("Pen width"),l.selectAll("option").data(e.penWidth).enter().append("div").attr("class",function(t){var n="option";return e.selectItem.penWidth===t&&(n+=" active"),n}).on("click",function(t){e.selectItem.penWidth=t,l.selectAll(".option").classed("active",!1),d3.select(this).classed("active",!0)}).append("div").style("background-color","#ffffff").style("width",function(e){return e+"px"}).style("height",function(e){return e+"px"}).style("margin","0 auto"),o.append("div").attr("class","nav-item click-button").text("Undo").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.undoCallback&&e.undoCallback()}),o.append("div").attr("class","nav-item click-button").text("Clean").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.clearCallback&&e.clearCallback()}),o.append("div").attr("class","nav-item click-button").text("Save as file").on("click",function(){d3.event.preventDefault?d3.event.preventDefault():d3.event.returnValue=!1,e&&e.saveFileCallback&&e.saveFileCallback()})};var OO=OO||{};OO.Modules=OO.Modules||{},OO.Modules.ModalComponent=function(e,t){var n=OO.Modules.ModalComponent.prototype._init,o=n(e,t);this.show=o.show},OO.Modules.ModalComponent.prototype._init=function(e,t){var n=t.append("div").attr("class","modal fade"),o=n.append("div").attr("class","modal-dialog"),a=o.append("div").attr("class","modal-content"),l=a.append("div").attr("class","modal-header");return l.append("button").attr("type","button").attr("class","close").attr("data-dismiss","modal").append("span").attr("aria-hidden","true").text("×"),l.append("h4").attr("class","modal-title"),a.append("div").attr("class","modal-body"),a.append("div").attr("class","modal-footer").append("button").attr("type","button").attr("class","btn btn-default").attr("data-dismiss","modal").text("OK"),{show:function(e,t){l.select(".modal-title").text(e),a.select(".modal-body").text(t),$(n.node()).modal("show")}}};var OO=OO||{};OO.Data=OO.Data||{},$(document).ready(function(){var e=d3.select("body"),t=d3.select("body").select(".main"),n=null,o=null,a=null,l=["red","orange","yellow","green","blue","indigo","purple","black","white"],i=[1,2,3,4,5,6,7,8,9];OO.Data.selectItem={penColor:l[0],penWidth:i[0]},OO.Data.pointArray=[],o=new OO.Modules.PainterComponent({selectItem:OO.Data.selectItem,pointArray:OO.Data.pointArray},t),n=new OO.Modules.SideMenuComponent({penColor:l,penWidth:i,selectItem:OO.Data.selectItem,saveFileCallback:function(){o.saveCanvas()},undoCallback:function(){o.undo()},clearCallback:function(){o.clearCanvas()}},e),a=new OO.Modules.ModalComponent({},e),OO.Data.sideMenuComponent=n,OO.Data.painterComponent=o,OO.Data.modalComponent=a,a.show("Information","White area can be drawn!"),$("body").on("click",".top-nav .sideMenuButton",function(e){e.preventDefault(),n.openNav()}),$("body").on("click",".side-nav .close-button",function(e){n.closeNav()}),window.onbeforeunload=function(e){OO.Data.pointArray.length>0?e.returnValue="Are you sure you want to leave?":e.preventDefault()}});