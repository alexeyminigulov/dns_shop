'use strict';

module.exports = function delProductCtrl( $scope, $rootScope, $state, $stateParams,
							ProductsFactory, DelProductsFactory, toastr ){

    var vm = this,
		modalDelete       = document.getElementById('modal-delete-product'),
		header			  = document.getElementsByTagName('header'),
		parentModalDelete = modalDelete.parentNode,
		productId		  = parseInt($stateParams.id),
		paranga           = document.createElement('div'),
		semanticUrl		  = $state.params.semanticUrl;

	vm.submit = submit;

	vm.product = {};

	ProductsFactory.getById(productId, semanticUrl)
		.then( function success(data){

			vm.product = data;

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

	function closeModal(){

		// Clear arrays StateChange...
		$rootScope.$$listeners.$stateChangeStart = [];
		$rootScope.$$listeners.$stateChangeSuccess = [];

		$(modalDelete).closeModal();
		parentModalDelete.removeChild( paranga );
		$(header).css('z-index', '');
	}

	function submit(e) {
		e.preventDefault();

		DelProductsFactory.submit(productId)
			.then( function success(msg){

				toastr.success(msg);
				$scope.$emit( 'ProductRenderView' );
				closeModal();
				$state.go('^');
			},
			function error(msg){

				toastr.error(msg);
				closeModal();
				$state.go('^');
			} );
	}


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "products.delete") {
				closeModal();
			}
		});

};