'use strict';

module.exports = function createManufacturerCtrl($rootScope, $scope, $state, $stateParams,
									toastr, ManufacturerFactory, $timeout) {

	var vm = this;

	vm.newManufacturer = {};


	vm.closeModalManufacturer = closeModalManufacturer;
	vm.submit = submit;


	init();

	function init() {

		loadModal();
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

	function closeModalManufacturer($event) {

		if($event) $event.preventDefault();
		closeModal();
	}

	function submit(e) {
		if(e) e.preventDefault();

		ManufacturerFactory.create(vm.newManufacturer)
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
			if(toState.name === "manufacturer.create") {
				loadModal();
			} else {
				closeModal();
			}
		});

};