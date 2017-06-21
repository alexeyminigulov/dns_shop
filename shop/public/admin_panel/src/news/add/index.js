'use strict';

module.exports = function(app){

    require('./styles.css');

	app.controller( 'addNewsCtrl', [ '$scope', '$rootScope', '$timeout', '$state', 
                                    'textAngularManager', 'AddNewsFactory', 'toastr',
                                    require('./addNewsCtrl') ]);

    app.factory( 'AddNewsFactory', [ '$http', '$q', 'NewsFactory',
                                    require('./AddNewsFactory') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('news.add', {
            url: '/create',
            template: require('./addNews.html'),
            data: {
            	label  : "Добавить",
                parent : "news"
            },
            controller: 'addNewsCtrl as vm'
        });

    } ]);

};