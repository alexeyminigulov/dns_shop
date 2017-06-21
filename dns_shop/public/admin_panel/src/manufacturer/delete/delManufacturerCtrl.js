'use strict';

module.exports = function delManufacturerCtrl($rootScope, $scope, $state, $stateParams,
									toastr, ManufacturerFactory, $timeout) {

	var vm = this,
		manufacturerId = parseInt($stateParams.id),
		modalDelete       = document.getElementById('modal-delete-manufacturer'),
		header			  = document.getElementsByTagName('header'),
		parentModalDelete = modalDelete.parentNode,
		paranga           = document.createElement('div');

	vm.manufacturer = {};

	vm.submit = submit;

	
	init();

	function init() {

		getManufacturer();
		loadModal();
	}

	function getManufacturer() {

		ManufacturerFactory.getById(manufacturerId)
		.then( function success(data){

			vm.manufacturer = angular.copy(data);

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function loadModal() {

		$(modalDelete).openModal();
		$(modalDelete).css('z-index', '1003');

		paranga.style.cssText=
			"position: fixed; \
			z-index: 1003; \
			opacity: 0.5; \
			left: 0; \
			top: 0; \
			right: 0; \
			bottom: 0; \
			background-color: #000; \
		  	";
		parentModalDelete.insertBefore(paranga, modalDelete);

		$(header).css('z-index', '0');
		$('.lean-overlay').css('display', 'none');
	}



	function submit(e) {
		if(e) e.preventDefault();

		ManufacturerFactory.delManufacturer(vm.manufacturer.id)
		.then( function success(msg){

			toastr.success(msg);
			$scope.$emit( 'ManufacturerRenderView' );
			$state.go('^');

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );
	}


};