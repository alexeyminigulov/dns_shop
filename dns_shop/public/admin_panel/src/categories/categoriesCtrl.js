'use strict';

module.exports = function ($scope, $timeout, $state, $stateParams, $rootScope, categoriesData, toastr){

	var categories;

	var vm = this,
		screenIsPhone = false;

	vm.editCategory = editCategory;

	vm.deleteCategory = deleteCategory;

	vm.selectCategory = selectCategory();
	vm.selectedCategory = {};

	vm.createCategory = createCategory;

	var subcategory = $stateParams.subcategory;


	init();

	function init(){

		getCategories();
		setHeightCategories();
		window.addEventListener("resize", setHeightCategories);
	}

	function getCategories() {

		// CategoriesFactory.get()
		// 	.then(function(data) {

		// 		categories = data;
		// 		setCategories();

		// 	}, function(data) {

		// 		toastr.error(data);
		// 	} );
		$timeout( ()=> {
			categories = categoriesData;
			setCategories();
		}, 100 );
	}

	function close() {

		window.removeEventListener("resize", setHeightCategories);
	}

	function setHeightCategories() {
		//if phone
		if(document.documentElement.clientWidth > 480 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.collection.categories'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			//console.dir( heightWindow + '	::   ' + topCollection + '   :   ' + heightFooter + '   :   ' + colletMargBot);
			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';
			//console.log("Resize");
		});
	}

	function selectCategory() {
		var groupButtons = document.querySelector('.footer > .group-buttons'),
			oldCategoryId = null;

		return function(category, option) {
			option = option || 'select';

			if(typeof category === 'object') vm.selectedCategory = category;

			if(!screenIsPhone) {
				if(category.hasOwnProperty("table_id") && vm.selectedCategory.table_id != null) return;
				$state.go("categories", { subcategory : category._id } );
				// console.log("Desctop");
				return;
			}

			if(option === 'select')
			if(oldCategoryId === category._id || oldCategoryId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {

					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldCategoryId = category._id;
					else
						oldCategoryId = null;
				});
			}
			else {
				oldCategoryId = category._id;
			}

			if(!oldCategoryId)
				return;

			if(option === 'open') {
				if(vm.selectedCategory.hasOwnProperty("table_id") && vm.selectedCategory.table_id != null) return;
				$state.go("categories", { subcategory : vm.selectedCategory._id } );
			}

			if(option === 'edit') {
				$state.go('categories.edit', {
					id       : vm.selectedCategory._id
				});
			}

			if(option === 'delete') {
				$state.go('categories.delete', {
					id       : vm.selectedCategory._id
				});
			}
		}
	}

	function editCategory($event, category) {

		$event.stopPropagation();
		$event.preventDefault();
		$state.go('categories.edit', {
			id: category._id
		});
	}

	function deleteCategory($event, category) {

		$event.stopPropagation();
		$event.preventDefault();
		$state.go('categories.delete', {
			id: category._id
		});
	}

	function createCategory($event) {

		$event.preventDefault();
		$state.go('categories.create');
	}
	
	function setCategories() {

		if(!subcategory) {

			vm.categories = categories.filter(function(value) {
				return value.parent === null;
			});
		} 
		else {

			vm.categories = categories.filter(function(value) {
				return value.parent === subcategory;
			});
		}
	}
	

	$scope.$on('delCategoryRenderView', function () {

			getCategories();
		});
	
	$scope.$on('searchCategoryByName', function (event, val) {

		function decorator(func, context) {
			return function(val) {

				func.apply(context, arguments);
				for(var i = 0, len = vm.categories.length; i < len; i++) {
					if( vm.categories[i].name.toLowerCase().indexOf(val.toLowerCase()) === -1 ) {
						vm.categories.splice(i--, 1);
						len--;
					}
				}
			};
		}
		decorator(setCategories, null)(val);
		
	});

	$scope.$on('CategoryRenderView', function () {

		getCategories();
	});


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "categories") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});

}