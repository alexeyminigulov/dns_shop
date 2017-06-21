"use strict";

module.exports = function(app){

	require('./styles.css');
	
	app.controller( 'showProductCtrl', [ '$scope', '$timeout', '$state', '$rootScope',
								'TypeProductsFactory', 'ProductsFactory', 'UnitsFactory', 
								'ListsValuesFactory', 'ManufacturerFactory', 'toastr',
										 require('./showProductCtrl') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('products.show', {
			url: '/show/:id',
			template: require('./showProduct.html'),
			data: {
				label: "Показать",
				parent: "products"
			},
			resolve: {
				listsValue: [ '$q', '$state', 'ListsValuesFactory', 'toastr', ($q, $state, ListsValuesFactory, toastr) => {

					var deferred = $q.defer();
					ListsValuesFactory.get()
					.then( 
						(data) => {
							deferred.resolve( data );
						},
						(msg) => {
							toastr.error(msg);
							$state.go('dashboard');
						}
					);
					return deferred.promise;
				} ],
				manufacturers: [ '$q', '$state', 'ManufacturerFactory', 'toastr', ($q, $state, ManufacturerFactory, toastr) => {

					var deferred = $q.defer();
					ManufacturerFactory.get()
					.then( 
						(data) => {
							deferred.resolve( data );
						},
						(msg) => {
							toastr.error(msg);
							$state.go('dashboard');
						}
					);
					return deferred.promise;
				} ]
			},
			controller: 'showProductCtrl as vm'
		});

	} ]);

};