/*
    A plugin defining some basic method to use on objects like 

    var input = $("#myDive");
    
    // This reset the input by removing value, depends on input type
    $(input).Reset();

    // This add a loading.gif in container to show the busy animation until method returns
    $(input).Loading();
*/

(function (global) {
    var extendedMethods = {

        /*
         * For getting id of an element, if exist.
         */
        GetId: function () {

            return this.get(0).id;
        },

        /*
         * For getting element from another elemeent.
         */
        Get: function (id) {

            return this.find(id);
        },

        /*
         * For reading value of inputs and html element.
         */
        Lookup: function (selector) {

            var element = this.find(selector);
            if ($(element).is('input') || $(element).is('select') || $(element).is('textarea')) {
                return element.val();
            }
            return element.html();
        },

        /*
         * For resetting a DOM element.
         */
        Reset: function (optionalSelector) {

            var element = $(this).SelCheck(optionalSelector);
            if ($(element).is('input')) {
                element.val("");
            } else {
                element.html("");
            }
            return this;
        },

        /*
         * For setting value to DOM element.
         */
        Set: function (selector, value) {  

            var element = this.find(selector);
            if ($(element).is('input') || $(element).is('select')) {
                element.val(value);
            } else {
                element.html(value);
            }
            return this;                
        },

        /*
         * For checking if selected DOM element exist or not
         */
        SelCheck: function (selector) {

            var element = this;
            if (typeof selector !== 'undefined') {
                element = this.find(selector);
            }
            return element;
        }
    };

    /* Method added as plugin type it can be applied to objects like $(object).Loading(); */
    global.fn.extend(extendedMethods);
})(jQuery);