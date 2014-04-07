
/*
 * A Javascript/jQuery framework created to work with Core Version 7.0. This framework uses template base engine
 * and writter using following libraries:
 */
window.rover = window.rover || {};

window.rover = (function ($window) {

	return {
		
		/*
		 * Check object for Null or Undefined values
		 */
		isNull: function (element) {

            return (typeof element === 'undefined' || 
					element === null || 
					element.length <= 0);
        },
        
        /*
		 * For getting DOM element using identifier (i.e. .class OR #id)
		 */
		getElement: function (identifier) {

            var _element,
                _object = $(identifier);

            if (_object.length > 0) {
                _element = _object;
            } else {
                console.log("DomException: Invalid or empty object " + identifier);
            }
            return _element;
        },

        /*
		 * A more reliable typeof.
		 */
		getType: function (obj) {

            return ({})
					.toString
					.call(obj)
					.match(/\s([a-zA-Z]+)/)[1]
					.toLowerCase();
        }
	}; 

})(window);