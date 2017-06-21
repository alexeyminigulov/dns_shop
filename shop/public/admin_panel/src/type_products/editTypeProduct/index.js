"use strict";

module.exports = function editTypeProduct(app){

	require('./styles.css');

    app.factory('EditTypeProductsFactory', [ '$http', '$q', '$rootScope',
                                             require('./EditTypeProductsFactory') ]);
	
	app.controller( 'editTypeProductCtrl', [ '$scope', '$timeout', '$state', '$rootScope',
        'TypeProductsFactory', 'EditTypeProductsFactory', 'toastr',
                                             require('./editTypeProductCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('type-products.edit', {
            url: '/edit/:id',
            template: require('./editTypeProduct.html'),
            data: {
                label: "Редактировать",
                parent: "type-products"
            },
            controller: 'editTypeProductCtrl as vm'
        });

    } ]);

};