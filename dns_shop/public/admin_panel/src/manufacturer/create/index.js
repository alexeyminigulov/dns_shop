"use strict";

module.exports = function(app){

	
    app.controller( 'createManufacturerCtrl', [ '$rootScope', '$scope', '$state', 
                                        '$stateParams', 'toastr', 'ManufacturerFactory', '$timeout',
                                      require('./createManufacturerCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('manufacturer.create', {
            url: '/create',
            template: require('./createManufacturer.html'),
            data: {
                label: "Добавить",
                parent: "manufacturer"
            },
            controller: 'createManufacturerCtrl as vm'
        });

    } ]);

};