'use strict';

module.exports = function(app){

    require('./styles.css');

	app.controller( 'list_valuesCtrl', [ '$state', '$stateParams', 'ListsValuesFactory', 'toastr',
                                    require('./list_valuesCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('list-values', {
            url: '/lists-values/{id:[0-9]{1,}}',
            template: require('./list_values.html'),
            data: {
            	label  : "Список",
                parent : "lists-values"
            },
            controller: 'list_valuesCtrl as vm'
        });

    } ]);

};