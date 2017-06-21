"use strict";

module.exports = function(app){

	require('./styles.css');
	
    app.controller( 'showUserCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'toastr', 'UserFactory',
                                      require('./showUserCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('users.show', {
            url: '/show/{id:[0-9]+}',
            template: require('./showUser.html'),
            data: {
                label: "Показать",
                parent: "users"
            },
            controller: 'showUserCtrl as vm'
        });

    } ]);

};