'use strict';

module.exports = function openSupplyCtrl($rootScope, $scope, $state, $stateParams,
					toastr, SupplyFactory){

	var vm = this,
		id = +$state.params.id;

	vm.supply = {};

	init();

	function init(){
		
		if( $state.params.id !== "create" )
		if( (id === 0) || (!isFinite(id)) ) {
			$state.go('^');
			return;
		}

		getSupply();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
		$('.header .fixed-action-btn.create-new-category').css('display', 'none');
	}

	function getSupply() {

		SupplyFactory.getById(id)
			.then( function success(data) {

				vm.supply = data;

			}, function erorr(msg) {

				toastr.error(msg);
			} );
	}


	function close(){

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
		$('.header .fixed-action-btn.create-new-category').css('display', '');
	}

	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			if(toState.name !== "supply.open") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});

};