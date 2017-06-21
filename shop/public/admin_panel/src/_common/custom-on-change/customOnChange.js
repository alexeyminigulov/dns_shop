'use strict';

module.exports = function ($parse){

	return {
		restrict: 'A',
		scope: {
			customOnChange : '=customOnChange'
		},

		link: function (scope, element, attrs) {
			//var onChangeFunc = scope.$eval(attrs.customOnChange);
			element.bind('change', scope.customOnChange);
		}
	};

};