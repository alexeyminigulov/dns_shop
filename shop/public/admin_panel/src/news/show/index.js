"use strict";

module.exports = function(app){


    app.factory('NewsFactory', [ '$http', '$q',
                                     require('./../NewsFactory') ]);
	
	app.controller( 'showNewsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
                    'NewsFactory', 'toastr',
                                      require('./showNewsCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('news.show', {
            url: '/show/:id',
            template: require('./showNews.html'),
            data: {
                label: "Обзор",
                parent: "news"
            },
            controller: 'showNewsCtrl as vm'
        });

    } ]);

};