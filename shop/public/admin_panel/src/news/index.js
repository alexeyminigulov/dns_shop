"use strict";

module.exports = function(app){

	require('./styles.css');
    require('./add')(app);
    require('./edit')(app);
    require('./show')(app);
    require('./delete')(app);


    app.factory('NewsFactory', [ '$http', '$q',
                                     require('./NewsFactory') ]);
	
	app.controller( 'newsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
                    'NewsFactory', 'toastr',
                                      require('./newsCtrl') ]);

    app.config([ '$stateProvider', function($stateProvider){

        $stateProvider.state('news', {
            url: '/news',
            template: require('./news.html'),
            data: {
                label: "Новости",
                parent: "dashboard"
            },
            controller: 'newsCtrl as vm'
        });

    } ]);

};