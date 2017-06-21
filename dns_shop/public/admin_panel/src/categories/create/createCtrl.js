'use strict';

module.exports = function ($scope, $rootScope, $timeout, $state, CategoriesFactory, $stateParams,
	TypeProductsFactory, toastr){

	var vm = this,
		modelHeightCreate,
		idSubcategory = $state.params.subcategory,
		parentCategory;

	vm.regex = {};
	vm.regex.semanticUrl = '[a-z]+';

	vm.newCategory  = {};

	vm.listProducts = [];
	TypeProductsFactory.get()
		.then( function success(data){

			vm.listProducts = data;

		}, function error(){

		} );

	if(idSubcategory){
		CategoriesFactory.getById(idSubcategory)
			.then( function success(data) {

				parentCategory = angular.copy( data );
				vm.newCategory.parent = idSubcategory;
				parentCategory.ancestors.push(idSubcategory);
				vm.newCategory.ancestors = parentCategory.ancestors;
			} );
	} else {
		vm.newCategory.parent = null;
		vm.newCategory.ancestors = [];
	}


	vm.closeModalCategory = closeModalCategory;
	vm.newCategorySubmit  = newCategorySubmit;


	loadModal();

	/*document.querySelector('.paranga').onclick = function(e) {
		closeModal('categories');
	};*/

	/*window.addEventListener("orientationchange", function() {
	    setHeightParanga();
	});*/
	//window.addEventListener("resize", resizeCreateCategory);


	/*function resizeCreateCategory() {
		setHeightParanga();
	}*/

	function newCategorySubmit(e) {
		e.preventDefault();
		
		CategoriesFactory.submitAdd(vm.newCategory)
			.then( function success(){

				toastr.success('Категория успешно создана!');
				$scope.$emit( 'CategoryRenderView' );
				$state.go('^');

			}, function error(msg){

				toastr.error(msg);
				$state.go('^');
			} );
	}

	/*
	 *@run setting css style height parange
	 */
	/*function setHeightParanga() {

		try {
		modelHeightCreate = document.querySelector('#modal-new-category').offsetHeight;
		} catch(e) {
			modelHeightCreate = CategoriesFactory.getModelHeightCreate();
		}
		if(modelHeightCreate) {
			CategoriesFactory.setModelHeightCreate( modelHeightCreate );
		}
		$('.paranga').css( 'bottom', modelHeightCreate +'px' );
		$('.lean-overlay').css('display', 'none');
	}*/

	/*
	 *@run modal window "Create Category"
	 */
	function loadModal() {

		$('select').select2();
		$('.input-field.select2 span.select2').css("width", "");

		$('#modal-new-category').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');
		$('.lean-overlay').css('display', 'none');

		// For set paranga
		//$timeout( function() { $('.paranga').css( 'display', 'block' ); } , 300 );
		//  Second query no found property offsetHeight
		//setHeightParanga();

	}

	/*
	 *@close modal window "Create Category"
	 */
	function closeModal(state) {

		$('#modal-new-category').closeModal();
		$('nav.top-nav.fixed').css('z-index', '');

		// For set paranga
		//$('.paranga').css( 'display', '' );
		//$('.paranga').css( 'bottom', '' );

		//window.removeEventListener("resize", resizeCreateCategory);

		$timeout( function() {
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
			if(toState.name === "categories.create") {
				loadModal();
			} else {
				closeModal(toState.name);
			}
		});
	$rootScope.$on('$stateChangeSuccess',
		function(event, toState, toParams, fromState, fromParams, options) {
			//console.dir("success: "+toState.name);
		});
}