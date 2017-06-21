'use strict';

module.exports = function(app){

    require('./styles.css');

	app.controller( 'unitsCtrl', [ '$scope', '$rootScope', 'UnitsFactory', 'toastr',
                                    require('./unitsCtrl') ]);
    app.factory( 'UnitsFactory', [ '$http', '$q',
                                    require('./UnitsFactory') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('units', {
            url: '/units',
            template: require('./units.html'),
            data: {
            	label  : "Еденицы измерения",
                parent : "dashboard"
            },
            controller: 'unitsCtrl as vm'
        });

    } ]);

};