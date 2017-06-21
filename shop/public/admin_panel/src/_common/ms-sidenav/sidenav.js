'use strict';

module.exports = function (){

    return {
        restrict: 'E',
        template: require('./template.html'),
        link: function(scope, profileFactory, element, attrs) {

			$('.collapsible').collapsible();

			$(".button-collapse").sideNav({
                menuWidth: 250
            });

		},
		controller: 'profileCtrl as vm'
    };

};