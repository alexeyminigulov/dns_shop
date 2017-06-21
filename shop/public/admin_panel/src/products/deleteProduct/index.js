"use strict";

module.exports = function delProducts(app){

	app.factory('DelProductsFactory', [ '$http', '$q', 'ProductsFactory',
                                         require('./DelProductsFactory') ]);

	app.controller( 'delProductCtrl', [ '$scope', '$rootScope', '$state', '$stateParams',
										'ProductsFactory', 'DelProductsFactory', 'toastr',
										require('./delProductCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('products.delete', {
            url: '/delete/:id',
            template: require('./delete.html'),
            controller: 'delProductCtrl as vm'
        });

    } ]);

};