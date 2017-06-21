"use strict";

module.exports = function editeCategory(app){

    app.factory('DelCategoriesFactory', [ '$http', '$q', 'CategoriesFactory',
                                         require('./DelCategoriesFactory') ]);

	app.controller( 'delCategoryCtrl', [ '$rootScope', '$scope', '$state', '$stateParams',
        'CategoriesFactory', 'DelCategoriesFactory', 'toastr',
                                         require('./delCategoryCtrl') ]);

    app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $stateProvider.state('categories.delete', {
            url: '/delete/{id:[0-9a-zA-Z]+}',
            template: require('./delete.html'),
            controller: 'delCategoryCtrl as vm'
        });

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            if(path === '/categories/delete/') {
                $location.replace().path('/');  // go back at dashboard
            }
        });

    } ]);

};