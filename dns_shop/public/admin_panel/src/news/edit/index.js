"use strict";

module.exports = function(app){

	require('./styles.css');


    app.factory('NewsFactory', [ '$http', '$q',
                                     require('./../NewsFactory') ]);
	
	app.controller( 'editNewsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
                    'NewsFactory', 'toastr',
                                      require('./editNewsCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('news.edit', {
            url: '/edit/:id',
            template: require('./editNews.html'),
            data: {
                label: "Редактировать новость",
                parent: "news"
            },
            controller: 'editNewsCtrl as vm'
        });

    } ]);

};