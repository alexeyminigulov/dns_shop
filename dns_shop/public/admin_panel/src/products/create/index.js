"use strict";

module.exports = function(app){

	//require('./styles.css');


    app.factory('CreateProductsFactory', [ '$http', '$q', 'ProductsFactory',
                                     require('./CreateProductsFactory') ]);
	
	app.controller( 'createProductsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
                    'CreateProductsFactory', 'TypeProductsFactory',
                    'UnitsFactory', 'ListsValuesFactory', 'ManufacturerFactory', 'toastr',
                                      require('./createProductsCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('products.create', {
            url: '/create',
            template: require('./createProducts.html'),
            data: {
                label: "Создать",
                parent: "products"
            },
            controller: 'createProductsCtrl as vm'
        });

    } ]);

};