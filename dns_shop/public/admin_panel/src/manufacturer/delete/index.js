"use strict";

module.exports = function(app){

	
    app.controller( 'delManufacturerCtrl', [ '$rootScope', '$scope', '$state', 
                                        '$stateParams', 'toastr', 'ManufacturerFactory', '$timeout',
                                      require('./delManufacturerCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('manufacturer.delete', {
            url: '/delete/:id',
            template: require('./delManufacturer.html'),
            data: {
                label: "Удалить",
                parent: "manufacturer"
            },
            controller: 'delManufacturerCtrl as vm'
        });

    } ]);

};