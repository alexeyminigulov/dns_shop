"use strict";

module.exports = function(app){

	require('./styles.css');
	
    app.controller( 'editUserCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'toastr', 'UserFactory',
                                      require('./editUserCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('users.edit', {
            url: '/edit/{id:[0-9]+}',
            template: require('./editUser.html'),
            data: {
                label: "Редактировать",
                parent: "users"
            },
            controller: 'editUserCtrl as vm'
        });

    } ]);

};