"use strict";

module.exports = function(app){

	require('./styles.css');


    // app.factory('ProductsFactory', [ '$http', '$q',
    //                                  require('./ProductsFactory') ]);
	
	app.controller( 'openSupplyCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', 'toastr', 'SupplyFactory',
                                      require('./openSupplyCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('supply.open', {
            url: '/:id',
            template: require('./openSupply.html'),
            data: {
                label: "Принятая поставка",
                parent: "supply"
            },
            controller: 'openSupplyCtrl as vm'
        });

    } ]);

};