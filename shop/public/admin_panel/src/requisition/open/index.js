"use strict";

module.exports = function(app){

	require('./styles.css');
	
	app.controller( 'openRequisitionCtrl', [ '$rootScope', '$scope', '$timeout', '$state',
                    '$stateParams', 'toastr', 'RequestFactory',
                                      require('./openRequisitionCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('requisition.open', {
            url: '/:id',
            template: require('./openRequisition.html'),
            data: {
                label: "Подробнее",
                parent: "requisition"
            },
            controller: 'openRequisitionCtrl as vm'
        });

    } ]);

};