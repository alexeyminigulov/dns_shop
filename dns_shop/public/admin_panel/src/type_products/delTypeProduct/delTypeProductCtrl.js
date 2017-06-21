'use strict';

module.exports = function delTypeProductCtrl($rootScope, $scope, $state, $stateParams,
							TypeProductsFactory, DelTypeProductFactory, toastr){

	var vm = this,
		modalDelete       = document.getElementById('modal-delete-type-product'),
		header			  = document.getElementsByTagName('header'),
		parentModalDelete = modalDelete.parentNode,
		typeProductId	  = $stateParams.id,
		paranga           = document.createElement('div');

	vm.submit = submit;

	vm.typeProduct = {};
	TypeProductsFactory.getById(typeProductId)
		.then( function success(data){

			vm.typeProduct = data;
		}, function error(msg){
			toastr.error(msg);
		} );

	loadModal();

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

	function closeModal(state){

		// Clear arrays StateChange...
		// $rootScope.$$listeners.$stateChangeStart = [];
		// $rootScope.$$listeners.$stateChangeSuccess = [];

		$(modalDelete).closeModal();
		parentModalDelete.removeChild( paranga );
		$(header).css('z-index', '');
	}

	function submit(e) {

		e.preventDefault();

		DelTypeProductFactory.submit(vm.typeProduct)
			.then( function success(data){

				if(data.status === 200) {
					toastr.success("Таблица удалена");
					$scope.$emit( 'renderViewTP' );
				}

				$state.go('^');

			}, function error(msg){

					toastr.error(msg);
					$state.go('^');
			} );
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "type-products.delete") {
				$rootScope.$$listeners.$stateChangeStart = [];
				closeModal();
			}
		});
	
};