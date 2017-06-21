'use strict';

module.exports = function(app){

    require('./styles.css');

	app.controller( 'settingProfileCtrl', [ '$scope', '$rootScope', 'ProfileFactory', 'toastr', '$timeout', '$state',
                                    require('./settingProfileCtrl') ]);
    app.factory( 'ProfileFactory', [ '$http', '$q', 'UserFactory',
                                    require('./../ProfileFactory') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('settings-profile', {
            url: '/profile/edit',
            template: require('./settingProfile.html'),
            data: {
            	label  : "Редактирования профиля",
                parent : "dashboard"
            },
            controller: 'settingProfileCtrl as vm'
        });

    } ]);

};