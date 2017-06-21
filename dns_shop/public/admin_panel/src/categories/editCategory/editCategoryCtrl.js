'use strict';


module.exports = function editCategoryCtrl($state, $scope, $rootScope, $timeout,
	EditCategoryFactory, TypeProductsFactory, CategoriesFactory, toastr){

    var vm = this,
    	// oldValueCategory = {},
    	modelHeightCreate;

	vm.category = {}; //$state.params.category;	// Обьект под новую категорию
	CategoriesFactory.getById($state.params.id)
		.then( function success(data){

			vm.category = angular.copy(data);
			// oldValueCategory = clone(data);

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );

	vm.closeModalCategory = closeModalCategory;

	vm.editCategorySubmit = editCategorySubmit;

	vm.listProducts = [];
	TypeProductsFactory.get()
		.then( function success(data){

			vm.listProducts = data;

		}, function error(){

		} );

	vm.regex = {};
	vm.regex.semanticUrl = '[a-z]+';


	loadModal();
	/*
	 *@run modal window "Create Category"
	 */
	function loadModal() {

		$('select').select2();
		$('.input-field.select2 span.select2').css("width", "");

		$('#modal-new-category').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');

		// For set paranga
		$('.lean-overlay').css('display', 'none');

	}

	document.querySelector('.paranga').onclick = function(e) {
		closeModal('categories');
	};

	/*
	 *@close modal window "Create Category"
	 */
	function closeModal(state) {

		$('#modal-new-category').closeModal();
		$('nav.top-nav.fixed').css('z-index', '');

		// For set paranga
		$('.paranga').css( 'display', '' );
		$('.paranga').css( 'bottom', '' );

		$timeout( function(){
								$('#slide-out').css('z-index', '');
								$state.go(state);
							}, 200 );
	}

	function closeModalCategory($event) {

		if($event) $event.preventDefault();
		closeModal("categories");
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			$rootScope.$$listeners.$stateChangeStart = [];
			if(toState.name === "categories.edit") {
				loadModal();
			} else {
				closeModal(toState.name);
			}
		});





	function editCategorySubmit(e) {
		e.preventDefault();

		// function changeCategory() {
		// 	for (var attr in vm.category) {
		// 		if (oldValueCategory.hasOwnProperty(attr))
		// 			vm.category[attr] = oldValueCategory[attr];
		// 		else
		// 			delete vm.category[attr];
		// 	}
		// }

		EditCategoryFactory.submit(vm.category)
			.then( function success(data){

				if(data.status === 200) {
					// if (vm.category.hasOwnProperty('table_id'))
					// 	if(vm.category['table_id'] === '')
					// 		delete vm.category['table_id'];
					toastr.success('Изменения применены!');
					$scope.$emit( 'CategoryRenderView' );
				} else {
					// changeCategory();
					toastr.error('Ошибка на сервере!');
				}

				$state.go('^');

			}, function error(data){

				toastr.error(data);
				// changeCategory();
			} );
	};


	// function clone(obj) {
	// 	if (null == obj || "object" != typeof obj) return obj;
	// 	var copy = obj.constructor();
	// 	for (var attr in obj) {
	// 		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	// 	}
	// 	return copy;
	// }


};