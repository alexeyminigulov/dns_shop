'use strict';

module.exports = function editManufacturerCtrl($rootScope, $scope, $state, $stateParams,
									toastr, ManufacturerFactory, $timeout) {

	var vm = this,
		manufacturerId = parseInt($stateParams.id);

	vm.manufacturer = {};

	vm.submit = submit;
	vm.close = close;

	
	init();

	function init() {

		loadModal();
		getManufacturer();
	}

	function loadModal() {

		$('#modal-new-category').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');
		$('.lean-overlay').css('display', 'none');
	}

	function closeModal() {

		$('#modal-new-category').closeModal();
		$('#slide-out').css('z-index', '');
		$('nav.top-nav.fixed').css('z-index', '');

		$timeout( function(){ $state.go('manufacturer'); }, 200 );
	}

	function close($event) {

		if($event) $event.preventDefault();
		closeModal();
	}

	function getManufacturer() {

		ManufacturerFactory.getById(manufacturerId)
		.then( function success(data){

			vm.manufacturer = angular.copy(data);

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function submit(e) {
		if(e) e.preventDefault();

		ManufacturerFactory.edit(vm.manufacturer)
		.then( function success(msg){

			toastr.success(msg);
			$scope.$emit( 'ManufacturerRenderView' );
			$state.go('^');

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );
	}




	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			$rootScope.$$listeners.$stateChangeStart = [];
			if(toState.name === "manufacturer.edit") {
				loadModal();
			} else {
				closeModal();
			}
		});

};