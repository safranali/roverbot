
/*
 * Keyboard module, binding events on keypress
 */
rover.keyboard = function () {
	"using strict";

	var $direction = rover.direction,
		$bot = rover.bot;

	return {
		/*
		 * For binding keyboard event
		 */
		init: function () {
			$(window).bind("keypress", function( event ) {
				
				// move to north direction on click of letter 'n'
				if ((event.keyCode || event.which) === 97) {
					$bot.add(0, 0, 90);
				}
				
				// move to north direction on click of letter 'n'
				if ((event.keyCode || event.which) === 110) {
					$direction.moveNorth();
				}
				
				// move to south direction on click of letter 's'
				if ((event.keyCode || event.which) === 115) {
					$direction.moveSouth();
				}
				
				// move to east direction on click of letter 'e'
				if ((event.keyCode || event.which) === 101) {
					$direction.moveEast();
				}
				
				// move to west direction on click of letter 'w'
				if ((event.keyCode || event.which) === 119) {
					$direction.moveWest();
				}

				// turn right on click of letter 'r'
				if ((event.keyCode || event.which) === 114) {
					$direction.turnRight();
				}
				
				// turn left on click of letter 'l'
				if ((event.keyCode || event.which) === 108) {
					$direction.turnLeft();
				}
				
				// move forward on click of letter 'f'
				if ((event.keyCode || event.which) === 102) {
					$direction.moveForward();
				}
			});
		}
	};
}();