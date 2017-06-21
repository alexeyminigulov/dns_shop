"use strict";

module.exports = function(app){

	require('./styles.css');
	require('./editProduct')(app);
	require('./deleteProduct')(app);
	require('./showProduct')(app);
	require('./create')(app);


	app.factory('ProductsFactory', [ '$http', '$q',
									 require('./ProductsFactory') ]);
	
	app.controller( 'productsCtrl', [ '$timeout', '$rootScope', '$scope', '$state', '$stateParams', 
					'ProductsFactory', 'TypeProductsFactory', 'UnitsFactory', 'toastr', 
					'typeProduct', 'units', 'products',
									  require('./productsCtrl') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('products', {
			url: '/products/{semanticUrl:[0-9a-zA-Z]+}',
			template: require('./products.html'),
			data: {
				label: "Товары",
				parent: "type-products"
			},
			resolve: {
				typeProduct: [ '$q', '$state', '$stateParams', 'TypeProductsFactory', 'toastr', ($q, $state, $stateParams, TypeProductsFactory, toastr) => {

					var deferred = $q.defer();
					TypeProductsFactory.getOneTypeProduct('semanticUrl', $stateParams.semanticUrl)
						.then(function(data) {

							deferred.resolve(data);

						}, function(data) {
							toastr.error(data);
							$state.go('dashboard');
						} );
					return deferred.promise;
				} ],
				units: [ '$q', '$state', 'UnitsFactory', 'toastr', ($q, $state, UnitsFactory, toastr) => {

					var deferred = $q.defer();
					UnitsFactory.get()
						.then( function succes(data){

							deferred.resolve(data);

						}, function error(data){

							toastr.error("Error " + data);
							$state.go('dashboard');
						} );
					return deferred.promise;
				} ],
				products: [ '$q', '$state', '$stateParams', 'ProductsFactory', 'toastr', 
				($q, $state, $stateParams, ProductsFactory, toastr) => {

					var deferred = $q.defer();
					ProductsFactory.get( $stateParams.semanticUrl )
						.then(function(data) {

							deferred.resolve(data);

						}, function(data) {
							toastr.error("Error " + data);
							$state.go('dashboard');
						} );
					return deferred.promise;
				} ]
			},
			controller: 'productsCtrl as vm'
		});

	} ]);

};