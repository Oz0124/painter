// side menu component
var OO = OO || {};
OO.Modules = OO.Modules || {};

OO.Modules.SideMenuComponent = function(options, container) {
	let _init = OO.Modules.SideMenuComponent.prototype._init;

	_init(container);


};


// 初始化element
OO.Modules.SideMenuComponent.prototype._init = function (container) {
	let sideNav = container.append('div').attr('class', 'side-nav');
	let sideNavContainer = sideNav.append('div').attr('class', 'side-nav-container');

	sideNavContainer.append('div').attr('class', 'close-button').text('×');
	sideNavContainer.append('div').attr('class', 'nav-item').text('About');
};
