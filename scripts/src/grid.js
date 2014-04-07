
/*
 * Grid module.
 */
rover.grid = function () {
	"using strict";

	var $getElement = rover.getElement,
		$isNull = rover.isNull,
		$handlebars = rover.handlebars,
		$bot = rover.bot,
		$reporting = rover.reporting,
		_container = null,
		_cellTemplateId = null,
		_botTemplateId = null,
		_executeBtn = null,
		_instructionBox = null,
		_reportingBox = null,
		_xAxis = 0,
		_yAxis = 0,

		/*
		 * For calculating size in %.
		 */
		_calculateSize = function(dimension, size){
			var _dimensionInPx =  parseFloat(dimension/size),
				_ratio = parseFloat(_dimensionInPx / dimension),
				_dimensionInPercentage = parseFloat(_ratio * 100);

			return _dimensionInPercentage;
		},

		/*
		 * For drawing cells inside in a grid container.
		 */
		_draw = function(xAxis, yAxis){
			xAxis++;
			yAxis++;
			var _parentWidth = _container.width(),
				_parentHeight = _container.height(),
				_width = _calculateSize(_parentWidth, xAxis),
				_height = _calculateSize(_parentHeight, yAxis),
				_data = [],
				_cell = (xAxis * yAxis) - 1;

				_xAxis = xAxis;
				_yAxis = yAxis;

				for (var y = 0; y < yAxis; y++) {
					for(var x = xAxis - 1; x >= 0; x--){
			
					
					_data[_cell] = {
						id: "cell",
						x: x,
						y: y,
						width: _width,
						height: _height
					};

					_cell--;
				}
			}

			// for rendering cells inside in DOM
			_render(_data);		
		},

		/*
		 * For rendering cells inside in a grid container.
		 */
		_render = function(data) {

			if(data.length > 0) {
				var _html = $handlebars.renderList(_cellTemplateId, data);

				// add cells to html
				_container.html(_html);
			}
		},

		/*
		 * For checking if the cell is last cell.
		 */
		_cellExist = function(x, y) {
			return x > -1 && x < _xAxis && 
					y > -1 && y < _yAxis;
		},

		/*
		 * For checking if the cell is marked as lost.
		 */
		_isLostCell = function (cell) {
			var _scent = cell.Lookup(".scent");
			return _scent && _scent.length > 0;
		},

		/*
		 * For setting a cell as lost.
		 */
		_setLostCell = function (bot, x, y) {
			
			bot.isLost = true;
			$reporting.print(bot);

			var _cell = $("#cell_" + x + "_" + y);
			_cell
				.Set(".scent", "LOST")
				.addClass("rb-lost");
		},

		/*
		 * For initialising other plugins.
		 */
		_initialisePlugins = function() {

			// initialising bot plugin
			$bot.init(_botTemplateId);

			// activating keyboard module
			if(rover.keyboard) {
				rover.keyboard.init();
			}

			// activating reporting module
			if(rover.reporting) {
				rover.reporting.init({
					reportingBoxId: _reportingBox
				});
			}

			// initialising instruction plugin
			if(rover.instruction){
				rover.instruction.init({
					instructionBoxId: _instructionBox,
					executeBtnId: _executeBtn
				});
			}
		};

	return {
		/*
		 * Initialises the grid
		 */
		init: function(args){

			_container = $getElement(args.containerId);
			_instructionBox = $getElement(args.instructionBoxId);
			_executeBtn = $getElement(args.executeBtnId);
			_reportingBox = $getElement(args.reportingBoxId);
			_cellTemplateId = args.cellTemplateId;
			_botTemplateId = args.botTemplateId;
			
			var _xAxis = args.x,
				_yAxis = args.y;
			
			if($isNull(_container) || $isNull(_xAxis) || $isNull(_yAxis) ||
				$isNull(_botTemplateId) || $isNull(_cellTemplateId) || 
				$isNull(_instructionBox) || $isNull(_executeBtn) || $isNull(_reportingBox)) {
				return;
			}

			_draw(_xAxis, _yAxis);

			// initialise other required plugins
			_initialisePlugins();
		},
		draw: _draw,
		cellExist: _cellExist,
		isLostCell: _isLostCell,
		setLostCell: _setLostCell
	};
}();