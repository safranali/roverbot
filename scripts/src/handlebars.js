
rover.handlebars = function () {
    "use strict";

        /*
         * For getting template's HTML from DOM.
         */
    var _getTemplate = function (templateId) {
            var _html = $(templateId).html();
            return _html;
        },

        /*
         * For compiling template. 
         */
        _compileTemplate = function(templateId){

            var _html = _getTemplate(templateId),
                _template = Handlebars.compile(_html);

            return _template;
        };

        
    
    return {
        
        /*
         * For rendering data.
         */
        render: function (templateId, data){
            var _template = _compileTemplate(templateId),
                _html = _template(data);

            return _html;
        },

        /*
         * For rendering list of data.
         */
        renderList: function (templateId, data) {

            var _template = _compileTemplate(templateId),
                _html = "";

            for (var i = 0; i < data.length; i++) {
                _html += _template(data[i]);
            }

            return _html;
        }
    };
} ();