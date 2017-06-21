"use strict";

module.exports = function(app){

	require('./styles.css');
    require('./create')(app);
    require('./open')(app);

    app.factory('SupplyFactory', [ '$http', '$q',
                                     require('./SupplyFactory') ]);
	
	app.controller( 'supplyCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', 'toastr', 'SupplyFactory',
                                      require('./supplyCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('supply', {
            url: '/supply',
            template: require('./supply.html'),
            data: {
                label: "Поставки",
                parent: "dashboard"
            },
            controller: 'supplyCtrl as vm'
        });

    } ]);

};