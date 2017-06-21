'use strict';

module.exports = function ($parse){

	return {

		restrict: 'A',
		
		link: function(scope, element, attr) {

			var module = $parse(attr.fileModel);
			var modelSetter = module.assign;

			element.bind('change', function() {

				scope.$apply(function() {

					modelSetter(scope, element[0].files[0]);
				});
			});
		}

	};

};