"use strict";

module.exports = function(app){

	require('./styles.css');


    // app.factory('ProductsFactory', [ '$http', '$q',
    //                                  require('./ProductsFactory') ]);
	
	app.controller( 'createSupplyCtrl', [ '$rootScope', '$scope', '$state', '$stateParams',
                                            'toastr', 'SupplyFactory', 'ProductsFactory',
                                      require('./createSupplyCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('supply.create', {
            url: '/create',
            template: require('./createSupply.html'),
            data: {
                label: "Новая поставка",
                parent: "supply"
            },
            controller: 'createSupplyCtrl as vm'
        });

    } ]);

};