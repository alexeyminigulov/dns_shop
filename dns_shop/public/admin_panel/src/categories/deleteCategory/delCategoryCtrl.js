'use strict';

module.exports = function delCategoryCtrl( $rootScope, $scope, $state, $stateParams,
			CategoriesFactory, DelCategoriesFactory, toastr ){

	var vm = this,
		modalDelete       = document.getElementById('modal-delete-category'),
		header			  = document.getElementsByTagName('header'),
		parentModalDelete = modalDelete.parentNode,
		categoryId		  = $stateParams.id,
		paranga           = document.createElement('div');

	vm.submit = submit;

	CategoriesFactory.getById(categoryId)
		.then( function success(data){

				vm.category = data;

			}, function error(data){

				toastr.error(data);
				$state.go('^');
			} );

	loadModal();

	function submit(e) {

		e.preventDefault();

		DelCategoriesFactory.submit(vm.category)
			.then( function success(data){

				if(data.status === 200) {
					
					toastr.success('Категория удалена!');
					$scope.$emit( 'delCategoryRenderView' );
				} else {

					toastr.error('Ошибка на сервере!');
				}

				$state.go('^');

			}, function error(data){

				toastr.error(data);
				$state.go('^');
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

	function closeModal(state){

		// Clear arrays StateChange...
		$rootScope.$$listeners.$stateChangeStart = [];
		$rootScope.$$listeners.$stateChangeSuccess = [];

		$(modalDelete).closeModal();
		parentModalDelete.removeChild( paranga );
		$(header).css('z-index', '');
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name === "categories.delete") {
				//loadModal();
			} else {
				closeModal();
				$rootScope.$$listeners.$stateChangeStart = [];
			}
		});
    
};