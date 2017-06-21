'use strict';

module.exports = function(app){

	app.run([ '$rootScope', function($rootScope) {
		$rootScope.typeOf = function(value) {
			return typeof value;
		};
	} ]);

    app.directive('stringToNumber', [ '$parse',
    								 require('./stringToNumber') ]);

}