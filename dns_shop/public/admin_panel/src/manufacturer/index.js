"use strict";

module.exports = function(app){

	require('./styles.css');
    require('./create')(app);
    require('./delete')(app);
    require('./edit')(app);

    app.factory( 'ManufacturerFactory', [ '$http', '$q',
                                    require('./ManufacturerFactory') ]);
	
    app.controller( 'manufacturerCtrl', [ '$rootScope', '$scope', '$state', 
                                        '$stateParams', 'toastr', 'ManufacturerFactory',
                                      require('./manufacturerCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('manufacturer', {
            url: '/manufacturers',
            template: require('./manufacturer.html'),
            data: {
                label: "Производители",
                parent: "dashboard"
            },
            controller: 'manufacturerCtrl as vm'
        });

    } ]);

};