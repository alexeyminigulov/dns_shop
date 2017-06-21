'use strict';

module.exports = function(app){

    app.directive('customOnChange', [ '$parse',
    								 require('./customOnChange') ]);

}