'use strict';

module.exports = function ($rootScope, $parse){

	return {

		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			// ngModel.$parsers.push(function(value) {
			// 	return '' + value;
			// });
			// ngModel.$formatters.push(function(value) {
			// 	return parseFloat(value);
			// });
			ngModel.$validators.validCharacters = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				
				return  /[0-9]+/.test(value);
			};
		}
	};

};