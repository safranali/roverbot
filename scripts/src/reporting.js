
/*
 * Reporting module, binding events on keypress
 */
rover.reporting = function () {
	"using strict";

	var $getElement = rover.getElement,
		$isNull = rover.isNull,
		_reportBox = null,

		/*
		 * Get direction in orientation.
		 */
		_getDirection = function(degree) {

			var direction = "S";
			if(degree === "0") {
				direction = "E";
			} else if(degree === "90") {
				direction = "N";
			} else if(degree === "180") {
				direction = "W";
			}

			return direction;
		},

		/*
		 * For printing output messages
		 */
		_print = function(bot, x, y) {
			if($isNull(_reportBox)) {
				return;
			}

			var _html = _reportBox.html(),
				_coordinates = bot.Lookup(".coordinate").split("-"),
				_direction = bot.Lookup(".direction");

			_direction = _getDirection(_direction);
			
			_html += "<br />" + _coordinates[0] + " " + _coordinates[1] + " " + _direction;
			if(bot.isLost) {
				_html += " LOST";
			}
			_reportBox.html(_html);
		},

		/*
		 * For reseting output area.
		 */
		_reset = function(){
			$(_reportBox).Reset();
		};

	return {
		/*
		 * For initialising reporting module.
		 */
		init: function (args) {
			_reportBox = $getElement(args.reportingBoxId);
		},
		print: _print,
		reset: _reset
	};
}();