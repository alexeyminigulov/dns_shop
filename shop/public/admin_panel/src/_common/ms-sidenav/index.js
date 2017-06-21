'use strict';

module.exports =  function(app){

	require('./styles.css');

    app.directive('msSidenav', require('./sidenav'));

    app.factory('ProfileFactory', [
    								'$http', '$q', require('./../../profile/ProfileFactory')
    								]);

    app.controller( 'profileCtrl', [
    									'$scope', '$timeout', 'ProfileFactory', 'toastr', '$state',
    									require('./profileCtrl')
    								]
    			  );

};