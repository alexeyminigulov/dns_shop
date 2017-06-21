"use strict";

module.exports = function createCategory(app){

	require('./styles.css');

    app.factory('validatorCreate', [ '$q', '$injector', require('./validatorCreate')]);
	
	app.controller( 'createCtrl', [ '$scope', '$rootScope', '$timeout', '$state', 'CategoriesFactory',
        '$stateParams', 'TypeProductsFactory', 'toastr',
                                    require('./createCtrl') ]);

    app.config([ '$httpProvider', '$stateProvider', function($httpProvider, $stateProvider){

        $httpProvider.interceptors.push('validatorCreate');

        $stateProvider.state('categories.create', {
            url: '/create',
            template: require('./create.html'),
            controller: 'createCtrl as vm'
        });

    } ]);

};