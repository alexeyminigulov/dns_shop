'use strict';

module.exports = function supplyCtrl($rootScope, $scope, $state, $stateParams,
					toastr, SupplyFactory) {

	var vm = this;

	vm.supplies = [];

	inite();

	function inite() {

		getSupplies();
	}

	function getSupplies() {

		SupplyFactory.get()
		.then( function success(data){
			
			vm.supplies = data;

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	$scope.$on('SupplyRenderView', function (event, newSupply) {

			vm.supplies.push(newSupply);
			console.log( newSupply );
		});

	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			   
		});

};