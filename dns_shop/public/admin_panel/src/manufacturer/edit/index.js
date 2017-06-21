"use strict";

module.exports = function(app){

	
    app.controller( 'editManufacturerCtrl', [ '$rootScope', '$scope', '$state', 
                                        '$stateParams', 'toastr', 'ManufacturerFactory', '$timeout',
                                      require('./editManufacturerCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('manufacturer.edit', {
            url: '/edit/:id',
            template: require('./editManufacturer.html'),
            data: {
                label: "Редактировать",
                parent: "manufacturer"
            },
            controller: 'editManufacturerCtrl as vm'
        });

    } ]);

};