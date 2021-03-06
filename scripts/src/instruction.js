
/*
 * Instruction module, binding events on keypress
 */
rover.instruction = function () {
	"using strict";

	var $getElement = rover.getElement,
		$isNull = rover.isNull,
		$direction = rover.direction,
		$reporting = rover.reporting,
		$grid = rover.grid,
		$bot = rover.bot,

		/*
		 * For reading instruction from input box
		 */
		_read = function (caller, instructionBox){

			var _input = instructionBox.val(),
				_instructions = _filter(_input);

			if(_instructions.length > 0) {
				// reset output area
				$reporting.reset();

				// from first line of instruction draw grid
				_drawGrid(_instructions[0]);

				for(var i=1; i < _instructions.length; i+=2){
					_addBot(_instructions[i]);
					_executeInstructions(_instructions[i+1]);
				}
			}
		},

		/*
		 * For filtering array, removing empty string value
		 */
		_filter = function(instruction) {

			var _arr = instruction.split("\n");
			for(var i=0;i < _arr.length;i++) {
				if(_arr[i].length <= 0) {
					_arr.splice(i, 1);
					i--;
				}
			}
			return _arr;
		},

		/*
		 * For drawing grid using rover.grid module
		 */
		_drawGrid = function(instruction) {
			var _size = instruction.split(" "),
				_xAxis = _size[0],
				_yAxis = _size[1];

			if(_xAxis > 50 || _yAxis > 50) {
				alert("Coordinates value can't exceed 50.");
			}

			$grid.draw(_xAxis, _yAxis);
		},

		/*
		 * For adding a new bot on the grid
		 */
		_addBot = function(instruction) {
			var _orientation = instruction.split(" "),
				_xPosition = _orientation[0],
				_yPosition = _orientation[1],
				_direction = _orientation[2];

			$bot.add(_xPosition, _yPosition, 90);

			_changeOrientation(_direction);
		},

		/*
		 * For moving bot in North, South, East and West orientation using orientation module
		 */
		_changeOrientation = function(orientation) {

			orientation = orientation.toLowerCase();

			if(orientation === "n") {
				$direction.moveNorth();
			} else if(orientation === "s") {
				$direction.moveSouth();
			} else if(orientation === "e") {
				$direction.moveEast();
			} else if(orientation === "w") {
				$direction.moveWest();
			}
		},

		/*
		 * For moving bot in instructed direction
		 */
		_executeInstructions = function(instructions){

			// if instructions > 100, throw error
			if(instructions.length > 100) {
				alert("Instruction length should be less than 100");
				return;
			}

			for (var i = 0; i < instructions.length; i++) {

				var _direction = instructions[i].toLowerCase();
				if(_direction === "f") {
					$direction.moveForward();
				} else if(_direction === "l") {
					$direction.turnLeft();
				} else if(_direction === "r") {
					$direction.turnRight();
				}
			}
		},

		/*
		 * For binding event to execute button
		 */
		_bindEvent = function(button, instructionBox) {
			button.on("click", function(){
				_read(this, instructionBox);
			});
		};

	return {
		/*
		 * For binding keyboard event
		 */
		init: function (args) {

			var executeBtn = $getElement(args.executeBtnId),
				instructionBox = $getElement(args.instructionBoxId);

			if($isNull(executeBtn) || $isNull(instructionBox)){
				return;
			}

			_bindEvent(executeBtn, instructionBox);
		}
	};
}();
