"use strict";

module.exports = function(app){

	require('./styles.css');
	require('./create')(app);
	require('./editCategory')(app);
	require('./deleteCategory')(app);

	app.controller( 'categoriesCtrl', [ '$scope', '$timeout', '$state',
					'$stateParams', '$rootScope', 'categoriesData', 'toastr',
										require('./categoriesCtrl') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('categories', {
			url: '/categories?subcategory',
			template: require('./categories.html'),
			data: {
				label: "Категории",
				parent: "dashboard"
			},
			resolve:{
				categoriesData: [ '$q', '$state', 'CategoriesFactory', 'toastr', function($q, $state, CategoriesFactory, toastr) {
					
					var deferred = $q.defer();
					CategoriesFactory.get()
						.then(function(data) {

							deferred.resolve( data );

						}, function(data) {

							toastr.error(data);
							// deferred.reject(data);
							$state.go('dashboard');
						} );
					return deferred.promise;
				} ]
			},
			controller: 'categoriesCtrl as vm'
		});

	} ]);

};