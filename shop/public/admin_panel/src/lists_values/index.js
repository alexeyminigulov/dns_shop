'use strict';

module.exports = function(app){

    require('./list_values')(app);

    require('./styles.css');

	app.controller( 'lists_valuesCtrl', [ '$state', 'ListsValuesFactory', 'toastr',
                                    require('./lists_valuesCtrl') ]);
    app.factory( 'ListsValuesFactory', [ '$http', '$q',
                                    require('./ListsValuesFactory') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('lists-values', {
            url: '/lists-values',
            template: require('./lists_values.html'),
            data: {
            	label  : "Списки",
                parent : "dashboard"
            },
            controller: 'lists_valuesCtrl as vm'
        });

    } ]);

};