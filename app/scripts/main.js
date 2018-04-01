var OO = OO || {};
OO.Data = OO.Data || {};

(function() {

	OO.openNav = function() {
		let width = d3.select('body').select('.side-nav .side-nav-container').style('width');
		d3.select('body').select('.side-nav').style('width', '100%');
		d3.select('body').select('.main').style('margin-left', width);
	};
	 
	OO.closeNav = function() {
	    d3.select('body').select('.side-nav').style('width', '0');
	    d3.select('body').select('.main').style('margin-left', '0');
	};
	

}());

// DOM載入完成
$(document).ready(function() {
	let body = d3.select('body');
	let sideMenuComponent = null;
	
	// create component
	sideMenuComponent = new OO.Modules.SideMenuComponent({
		
	}, body);

	OO.Data.sideMenuComponent = sideMenuComponent;

	$('body').on('click', '.top-nav .sideMenuButton', function (e) {
		e.preventDefault();

		OO.openNav();
	});

	$('body').on('click', '.side-nav .close-button', function (e) {

		OO.closeNav();
	});
	
});
