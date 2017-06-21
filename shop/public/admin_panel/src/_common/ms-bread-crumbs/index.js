'use strict';

module.exports = function(app){

	require('./styles.css');

    app.directive('msBreadCrumbs', [ '$state', '$timeout', '$rootScope', 'CategoriesFactory',
    								 require('./breadCrumbs') ]);

    app.controller('breadCrumbsCtrl', [ '$state', '$timeout', '$rootScope', '$scope',
    									require('./breadCrumbsCtrl') ]);

}