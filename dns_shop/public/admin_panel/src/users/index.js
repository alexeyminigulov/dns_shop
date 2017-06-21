"use strict";

module.exports = function(app){

	require('./styles.css');
    require('./editUser')(app);
    require('./showUser')(app);

    app.factory( 'UserFactory', [ '$http', '$q',
                                    require('./UserFactory') ]);
	
    app.controller( 'usersCtrl', [ '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'toastr', 'UserFactory',
                                      require('./usersCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('users', {
            url: '/users',
            template: require('./users.html'),
            data: {
                label: "Пользователя",
                parent: "dashboard"
            },
            controller: 'usersCtrl as vm'
        });

    } ]);

};