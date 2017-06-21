"use strict";

module.exports = function(app){

	require('./styles.css');

	app.directive('editProductElement', [ '$timeout', '$rootScope',
										require('./editProductElement') ]);

	app.factory('EditProductFactory', [ '$http', '$q',
									  require('./EditProductFactory') ]);
	
	app.controller( 'editProductCtrl', [ '$scope', '$timeout', '$state', '$rootScope', 'UnitsFactory',
										 'TypeProductsFactory', 'ProductsFactory', 
										 'EditProductFactory', 'ListsValuesFactory', 
										 'ManufacturerFactory', 'toastr',
										 require('./editProductCtrl') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('products.edit', {
			url: '/edit/:id',
			template: '<edit-product-element></edit-product-element>',
			data: {
				label: "Редактировать",
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
			controller: 'editProductCtrl as vm'
		});

	} ]);

};