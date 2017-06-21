'use strict';

module.exports = function typeProductsCtrl($rootScope, $timeout, $scope, $state, TypeProductsFactory, toastr, typeProducts) {

	var vm = this,
		screenIsPhone = false;

	vm.typeProducts = [];

	vm.editTypeProduct = editTypeProduct;

	vm.delTypeProduct = delTypeProduct;

	vm.selectTP  = selectTP();
	vm.selectedProduct = {};



	init();


	function init(){

		getTypeProducts();
		setHeightTypeProducts();
		window.addEventListener("resize", setHeightTypeProducts);
	}

	function getTypeProducts(func) {

		// TypeProductsFactory.get()
		// .then(function(data) {

		// 	angular.copy(data, vm.typeProducts);
		// 	if( func )
		// 	if(typeof func === 'function')
		// 		func();

		// }, function(data) {

		// 	toastr.error("Error " + data);
		// } );
		$timeout( ()=>{
			angular.copy(typeProducts, vm.typeProducts);
			if( func )
			if(typeof func === 'function')
				func();
		}, 100 );
	}

	function setHeightTypeProducts() {
		//if phone
		if(document.documentElement.clientWidth > 480 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.collection.type-products'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';
		});
	}

	function close() {

		window.removeEventListener("resize", setHeightTypeProducts);
	}

	function editTypeProduct($event, typeProduct, $index) {

		$event.stopPropagation();
		$event.preventDefault();

		$state.go('type-products.edit', {
			id : typeProduct._id,
			typeProduct : typeProduct,
			$index : $index
		});
	}

	function delTypeProduct(e, typeProduct) {

		e.stopPropagation();
		e.preventDefault();

		$state.go('type-products.delete', {
			id : typeProduct._id
		});
	}

	function selectTP() {
		var groupButtons = document.querySelector('.footer > .group-buttons'),
			oldTPId = null;
		return function(category, option) {		//option('select','edit','open')
			option = option || 'select';
			if(typeof category === 'object') vm.selectedProduct = category;

			if(!screenIsPhone) {

				$state.go("products", ({ semanticUrl : category.semanticUrl }) );
				$rootScope.addAnimateLoading('.main-view');
				return;
			}

			if(option === 'select')
			if(oldTPId === category._id || oldTPId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {
					//console.dir(val);
					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldTPId = category._id;
					else
						oldTPId = null;
				});
			}
			else {
				oldTPId = category._id;
			}

			if(!oldTPId)
				return;

			if(option === 'open') {

				$state.go( "products", {  semanticUrl : vm.selectedProduct.semanticUrl  } );
				$rootScope.addAnimateLoading('.main-view');
			}

			if(option === 'edit') {
				$state.go('type-products.edit', {
					id : vm.selectedProduct._id,
					typeProduct : vm.selectedProduct,
					$index : vm.selectedProduct._id
				});
			}

			if(option === 'delete') {
				$state.go('type-products.delete', {
					id : vm.selectedProduct._id
				});
			}

		}
	}


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "type-products") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}	    
		});


	$scope.$on('searchTPByName', function (event, val) {
		
		function search(val) {

			return function() {
				for(var i = 0, len = vm.typeProducts.length; i < len; i++) {
					if( vm.typeProducts[i].name.toLowerCase().indexOf(val.toLowerCase()) === -1 ) {
						vm.typeProducts.splice(i--, 1);
						len--;
					}
				}
			}
		}
		getTypeProducts( search(val) );

	});

	$scope.$on( 'renderViewTP', function() {

		getTypeProducts();
	} );

    
};