"use strict";

module.exports = function editeCategory(app){

	require('./styles.css');

    app.factory('EditCategoryFactory', [ '$http', '$q', 'CategoriesFactory',
                                         require('./EditCategoryFactory') ]);
	app.controller( 'editCategoryCtrl', [ '$state', '$scope', '$rootScope', '$timeout','EditCategoryFactory',
                                          'TypeProductsFactory', 'CategoriesFactory', 'toastr',
                                          require('./editCategoryCtrl') ]);

    app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $stateProvider.state('categories.edit', {
            url: '/edit/{id:[0-9a-zA-Z]+}',
            template: require('./edit.html'),
            controller: 'editCategoryCtrl as vm'
        });

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            if(path === '/categories/edit/') {
                $location.replace().path('/');  // go back at dashboard
            }
            else if(path === '/products/') {
                $location.replace().path('/type-products');  // go back at dashboard
            }
        });

    } ]);

};