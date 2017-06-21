"use strict";

module.exports = function(app){

	require('./styles.css');
    require('./open')(app);

    app.factory('RequestFactory', [ '$http', '$q',
                                     require('./RequestFactory') ]);
	
	app.controller( 'requisitionCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', 'toastr', 'RequestFactory',
                                      require('./requisitionCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('requisition', {
            url: '/requisition',
            template: require('./requisition.html'),
            data: {
                label: "Заявки",
                parent: "dashboard"
            },
            controller: 'requisitionCtrl as vm'
        });

    } ]);

};