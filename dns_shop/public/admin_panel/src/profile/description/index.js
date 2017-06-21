'use strict';

module.exports = function(app){

	require('./styles.css');

	app.controller( 'descProfileCtrl', [ '$scope', '$rootScope', 'toastr', 'user',
									require('./descProfileCtrl') ]);
	app.factory( 'ProfileFactory', [ '$http', '$q',
									require('./../ProfileFactory') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('desc-profile', {
			url: '/profile',
			template: require('./descProfile.html'),
			data: {
				label  : "Профиль",
				parent : "dashboard"
			},
			resolve:{
				user: function($q, ProfileFactory){
					var deferred = $q.defer();
					ProfileFactory.get()
					.then( function success(data) {

						deferred.resolve( data );

					}, function error(msg) {
						deferred.reject(msg);
						toastr.error(msg);
					} );
					return deferred.promise;
				}
			},
			controller: 'descProfileCtrl as vm'
		});

	} ]);

};