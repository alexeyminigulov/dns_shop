'use strict';

module.exports = function ($state){

        return {
            restrict: 'E',
            template: require('./template.html'),
            link: function(scope) {

            	scope.valueBySearch = '';
            	var currentState = '';

                scope.search = function() {

                	currentState = $state.current.name;

                	if(currentState === 'categories') {

                		scope.$broadcast('searchCategoryByName', scope.valueBySearch);
                	}
                	else if(currentState === 'type-products') {

                		scope.$broadcast('searchTPByName', scope.valueBySearch);
                	}
                    else if(currentState === 'products') {

                        scope.$broadcast('searchProductByName', scope.valueBySearch);
                    }
                    else if(currentState === 'news') {

                        scope.$broadcast('searchNewsByName', scope.valueBySearch);
                    }
                };
            }
        };

};