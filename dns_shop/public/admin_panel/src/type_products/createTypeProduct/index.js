"use strict";

module.exports = function createTypeProduct(app){

	require('./styles.css');
	
	app.controller( 'createTypeProductCtrl', [ '$scope', '$timeout', '$state', '$rootScope',
                                'TypeProductsFactory', 'UnitsFactory', 'ListsValuesFactory', 'toastr',
                                                require('./createTypeProductCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('type-products.create', {
            url: '/create',
            template: require('./createTypeProduct.html'),
            data: {
                label: "Создать",
                parent: "type-products"
            },
            controller: 'createTypeProductCtrl as vm'
        });

    } ]);

};