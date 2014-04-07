
/*
 * Bot module.
 */
rover.bot = function () {
	"using strict";

	var $handlebars = rover.handlebars,
		$reporting = rover.reporting,
		_templateId = null,
		_count = 1,

		/*
		 * Get active bot.
		 */
		_getActiveBot = function() {
			return $("#planetMars .bot.active");
		},
		
		/*
		 * Get active bot and it's position.
		 */
		_get = function() {
			var _bot = _getActiveBot();

			if(_bot.length <= 0) {
				return;
			}

			var _coordinate = _bot.Lookup(".coordinate"),
				_position = _coordinate.split("-"),
				_direction = _bot.Lookup(".direction");

			return {
				bot: _bot,
				x: parseInt(_position[0]),
				y: parseInt(_position[1]),
				direction: parseInt(_direction)
			};
		},

		/*
		 * For adding new bot.
		 */
		_add = function (x, y, direction) {

			_deactivate(_getActiveBot());

			var _data = {
					x: x,
					y: y,
					direction: direction
				},
				_newBot = $handlebars.render(_templateId, _data);

			$("#cell_"+x+"_"+y).prepend(_newBot);
		},

		/*
		 * For removing existing bot.
		 */
		_remove = function (bot) {
						
			$(bot).remove();
		},

		/*
		 * For removing existing bot.
		 */
		_deactivate = function (bot) {
			
			if(bot.length > 0) {
				$reporting.print(bot);
				$(bot).removeClass("active");
			}
		};

	return {
		/*
		 * Initialising bot module.
		 */
		init: function (templateId) {
			_templateId = templateId;
		},
		get: _get,
		add: _add,
		remove: _remove
	};
}();