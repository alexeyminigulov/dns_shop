"use strict";

module.exports = function(app){

	require('./styles.css');
	require('./createTypeProduct')(app);
	require('./editTypeProduct')(app);
	require('./delTypeProduct')(app);

	app.factory('TypeProductsFactory', [ '$http', '$q', 'ProductsFactory',
										 require('./TypeProductsFactory') ]);
	
	app.controller( 'typeProductsCtrl', [ '$rootScope', '$timeout',
											'$scope', '$state', 'TypeProductsFactory', 'toastr', 'typeProducts',
										  require('./typeProductsCtrl') ]);

	app.config([ '$stateProvider', function($stateProvider){

		$stateProvider.state('type-products', {
			url: '/type-products',
			template: require('./typeProducts.html'),
			data: {
				label: "Виды товаров",
				parent: "dashboard"
			},
			resolve: {
				typeProducts: [ '$q', '$state', 'TypeProductsFactory', 'toastr', ($q, $state, TypeProductsFactory, toastr) => {

					var deferred = $q.defer();
					TypeProductsFactory.get()
						.then(function(data) {

							deferred.resolve(data);

						}, function(data) {
							toastr.error("Error " + data);
							// deferred.reject("Error " + data);
							$state.go('dashboard');
						} );
					return deferred.promise;
				} ]
			},
			controller: 'typeProductsCtrl as vm'
		});

	} ]);

};