// side menu component
var OO = OO || {};
OO.Modules = OO.Modules || {};

OO.Modules.SideMenuComponent = function(options, container) {
	let _init = OO.Modules.SideMenuComponent.prototype._init;

	_init(options, container);

	this.openNav = function() {
		let width = d3.select('body').select('.side-nav .side-nav-container').style('width');
		d3.select('body').select('.side-nav').style('width', '100%');
		// d3.select('body').select('.main').style('margin-left', width);
	};
	 
	this.closeNav = function() {
	    d3.select('body').select('.side-nav').style('width', '0');
	    // d3.select('body').select('.main').style('margin-left', '0');
	};

};


// 初始化element
OO.Modules.SideMenuComponent.prototype._init = function (options, container) {
	let sideNav = container.append('div').attr('class', 'side-nav');
	let sideNavContainer = sideNav.append('div').attr('class', 'side-nav-container');

	sideNavContainer.append('div').attr('class', 'close-button').text('×');
	// 調色盤
	let pallete = sideNavContainer.append('div').attr('class', 'nav-item pallete');
	pallete.append('div').attr('class', 'title').text('Pen color');

	pallete.selectAll('option')
		.data(options.penColor)
		.enter()
		.append('div')
		.attr('class', function (item) {
          	let className = 'option';

			if (options.selectItem.penColor === item) {
				className += ' active';
			}

			return className;
		})
		.style('background-color',  function (item) {
			return item;
		})
		.on('click', function (d) {
			options.selectItem.penColor = d;

			pallete.selectAll('.option').classed('active', false);

			d3.select(this).classed('active', true);
		});

	// 筆寬
	let penWidth = sideNavContainer.append('div').attr('class', 'nav-item pen-width');
	penWidth.append('div').attr('class', 'title').text('Pen width');

	penWidth.selectAll('option')
		.data(options.penWidth)
		.enter()
		.append('div')
		.attr('class', function (item) {
          	let className = 'option';

			if (options.selectItem.penWidth === item) {
				className += ' active';
			}

			return className;
		})
		.on('click', function (d) {
			options.selectItem.penWidth = d;

			penWidth.selectAll('.option').classed('active', false);

			console.log(this);

			d3.select(this).classed('active', true);
		})
		.append('div').style('background-color', '#ffffff')
			.style('width', function(item) {
				return item + 'px';
			})
			.style('height', function (item) {
				return item + 'px';
			})
			.style('margin', '0 auto');
	

	sideNavContainer.append('div').attr('class', 'nav-item click-button').text('Undo')
		.on('click', function () {
			d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

			if (options && options.undoCallback) {
				options.undoCallback();
			}
		});

	sideNavContainer.append('div').attr('class', 'nav-item click-button').text('Clean')
		.on('click', function () {
			d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);

			if (options && options.clearCallback) {
				options.clearCallback();
			}
		});

	// save as file
	sideNavContainer.append('div').attr('class', 'nav-item click-button').text('Save as file')
		.on('click', function () {
			d3.event.preventDefault ? d3.event.preventDefault() : (d3.event.returnValue = false);
			
			if (options && options.saveFileCallback) {
				options.saveFileCallback();
			}
		});
};


