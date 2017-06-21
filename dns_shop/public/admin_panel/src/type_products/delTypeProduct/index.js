"use strict";

module.exports = function editTypeProduct(app){

	require('./styles.css');

    app.factory('DelTypeProductFactory', [ '$http', '$q', 'TypeProductsFactory',
                                         require('./DelTypeProductFactory') ]);
	
	app.controller( 'delTypeProductCtrl', [ '$rootScope', '$scope', '$state', '$stateParams',
        'TypeProductsFactory', 'DelTypeProductFactory', 'toastr',
                                            require('./delTypeProductCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('type-products.delete', {
            url: '/delete/:id',
            template: require('./delTypeProduct.html'),
            data: {
                label: "Удалить",
                parent: "type-products"
            },
            controller: 'delTypeProductCtrl as vm'
        });

    } ]);

};