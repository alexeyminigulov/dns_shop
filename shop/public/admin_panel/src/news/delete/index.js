"use strict";

module.exports = function(app){


    app.factory('NewsFactory', [ '$http', '$q',
                                     require('./../NewsFactory') ]);
	
	app.controller( 'delNewsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
                    'NewsFactory', 'toastr',
                                      require('./delNewsCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('news.deleteNews', {
            url: '/delete/:id',
            template: require('./delNews.html'),
            data: {
                label: "Удалить новость",
                parent: "news"
            },
            controller: 'delNewsCtrl as vm'
        });

    } ]);

};