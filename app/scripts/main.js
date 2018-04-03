var OO = OO || {};
OO.Data = OO.Data || {};

(function() {

	
	

}());

// DOM載入完成
$(document).ready(function() {
	let body = d3.select('body');
	let main = d3.select('body').select('.main');
	let sideMenuComponent = null;
	let painterComponent = null;
	let modalComponent = null;
	let penColor = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'black', 'white'];
	let penWidth = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// 預設選取畫筆顏色與寬度
	OO.Data.selectItem = {
		penColor: penColor[0],
		penWidth: penWidth[0]
	};

	OO.Data.pointArray = [];

	// canvas component
	painterComponent = new OO.Modules.PainterComponent({
		selectItem: OO.Data.selectItem,
		pointArray: OO.Data.pointArray
	}, main);

	// sidemenu component
	sideMenuComponent = new OO.Modules.SideMenuComponent({
		penColor: penColor,
		penWidth: penWidth,
		selectItem: OO.Data.selectItem,
		saveFileCallback: function () {
			painterComponent.saveCanvas();
		},
		undoCallback: function () {
			painterComponent.undo();
		},
		clearCallback: function () {
			painterComponent.clearCanvas();
		},
	}, body);

	// Modal component
	modalComponent = new OO.Modules.ModalComponent({

	}, body);

	OO.Data.sideMenuComponent = sideMenuComponent;
	OO.Data.painterComponent = painterComponent;
	OO.Data.modalComponent = modalComponent;

	modalComponent.show('Information', 'White area can be drawn!');

	$('body').on('click', '.top-nav .sideMenuButton', function (e) {
		e.preventDefault();

		sideMenuComponent.openNav();
	});

	$('body').on('click', '.side-nav .close-button', function (e) {

		sideMenuComponent.closeNav();
	});

	window.onbeforeunload = function (event) {

		if (OO.Data.pointArray.length > 0) {
		    event.returnValue = 'Are you sure you want to leave?';
		}
		else {
			event.preventDefault();
		}
	    
	};
	
});
