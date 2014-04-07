
/*
 * Direction module.
 */
rover.direction = function () {
	"using strict";

	var $isNull = rover.isNull,
		$bot = rover.bot,
		$grid = rover.grid,

		/*
		 * For turning bot to left direction.
		 */
		_turnLeft = function(){
			var _model = $bot.get();

			if($isNull(_model) === false) {
				var _direction = _model.direction;

				if(_direction === 90) {
					_moveWest(_model);
				} else if (_direction === 180) {
					_moveSouth(_model);
				} else if (_direction === 270) {
					_moveEast(_model);
				} else {
					_moveNorth(_model);
				}
			}
		},

		/*
		 * For turning bot to right direction.
		 */
		_turnRight = function(){
			var _model = $bot.get();

			if($isNull(_model) === false) {
			
				var _direction = _model.direction;

				if(_direction === 90) {
					_moveEast(_model);
				} else if (_direction === 0) {
					_moveSouth(_model);
				} else if (_direction === 270) {
					_moveWest(_model);
				} else {
					_moveNorth(_model);
				}
			}
		},

		/*
		 * For turning direction.
		 */
		_turn = function(bot, existingDirection, newDirection) {
			var _class = "rb-degree-",
				_existingClass = _class + existingDirection,
				_newClass = _class + newDirection;

			// change direction
			bot.Get(".rb-head")
				.removeClass(_existingClass)
				.addClass(_newClass);

			// save direction
			bot.Set(".direction", newDirection);
		},

		/*
		 * Get current active bot model.
		 */
		_getModel = function(model) {
			
			var _model = model;
			if($isNull(_model)) {
				_model = $bot.get();
			}

			return _model;
		},

		/*
		 * For moving bot in north direction.
		 */
		_moveNorth = function(model){
			var _model = _getModel(model);
			if($isNull(_model)) {
				return;
			}
			_turn(_model.bot, _model.direction, 90);
		},

		/*
		 * For moving bot in south direction.
		 */
		_moveSouth = function(model){
			var _model = _getModel(model);
			if($isNull(_model)) {
				return;
			}
			_turn(_model.bot, _model.direction, 270);
		},

		/*
		 * For moving bot in east direction.
		 */
		_moveEast = function(model){
			var _model = _getModel(model);
			if($isNull(_model)) {
				return;
			}
			_turn(_model.bot, _model.direction, 0);
		},

		/*
		 * For moving bot in west direction.
		 */
		_moveWest = function(model){
			var _model = _getModel(model);
			if($isNull(_model)) {
				return;
			}
			_turn(_model.bot, _model.direction, 180);
		},

		/*
		 * For moving bot in east direction.
		 */
		_moveForward = function(){
			var _model = $bot.get();

			if(typeof _model === "object") {
				var _direction = _model.direction;

				if(_direction === 90) {
					_move(_model, _model.x, _model.y + 1);
				} else if (_direction === 180) {
					_move(_model, _model.x - 1, _model.y);
				} else if (_direction === 270) {
					_move(_model, _model.x, _model.y - 1);
				} else if (_direction === 0){
					_move(_model, _model.x + 1, _model.y);
				}
			}
		},

		/*
		 * For moving bot.
		 */
		_move = function(model, x, y){

			if($grid && $bot){
				
				var _cell = $("#cell_" + x + "_" + y);
				
				// check if it is a lost cell then block the movement.
				if(_cell && $grid.isLostCell(_cell)) {
					return;
				}
				
				$bot.remove(model.bot);
				
				if($grid.cellExist(x, y) === false) {
					$grid.setLostCell(model.bot, model.x, model.y);
				}

				$bot.add(x, y, model.direction);
			}
		};

	return {
		turnLeft: _turnLeft,
		turnRight: _turnRight,
		moveForward: _moveForward,
		moveNorth: _moveNorth,
		moveSouth: _moveSouth,
		moveEast: _moveEast,
		moveWest: _moveWest
	};
}();