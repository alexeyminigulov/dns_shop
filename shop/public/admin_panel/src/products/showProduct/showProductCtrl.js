'use strict';

module.exports = function editProductCtrl($scope, $timeout, $state, $rootScope,
									TypeProductsFactory, ProductsFactory, UnitsFactory, 
									ListsValuesFactory, ManufacturerFactory, toastr) {

	var vm          = this,
		productId   = $state.params.id,
		semanticUrl = $state.params.semanticUrl;


	vm.units = [];
	vm.product = {};
	vm.typeProduct = {};
	vm.listValues = [];


	vm.InitGallery = InitGallery();



	init();

	function init() {

		$rootScope.hideLoading();
		getProduct();
		$('main > .container').css("overflow", "visible");
		$('.highlight.centered.table.products.responsive-table').css("display", "none");
		$('.side-nav-right').css("overflow", "visible");
		$('.products.header').css('display', 'none');
		$('.products > .pagination').parent().css('display', 'none');
		$('.products.footer').css('display', 'none');
	}

	function getProduct() {

		ProductsFactory.getById( parseInt(productId), semanticUrl )
		.then( function success(data) {

			vm.product = angular.copy(data);
			getTypeProduct();
			getBrands();

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getBrands() {

		ManufacturerFactory.getById(vm.product.manufacturer_id)
		.then( function success(data) {

			vm.product.manufacturer_id = angular.copy( data.name );

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getTypeProduct() {

		TypeProductsFactory.getById(vm.product.type_product_id)
		.then( function success(data) {

			vm.typeProduct = angular.copy( data );
			vm.typeProduct.fields.forEach( function(val, i) {
				if( (val.type.name === 'list') ) {
					getListValues(val.type.listValue, i);
				}
			} );
			getUnits();

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getUnits() {

		UnitsFactory.get()
		.then( function success(data) {

			vm.units = data;
			// console.log(vm.units);
			// console.log(vm.product);
			// console.log(vm.typeProduct);
			vm.typeProduct.fields.forEach( function(val, i){
				if(val.type.name === 'integer'){
					vm.units.find( function(v){
						if(v.id === val.type.unit) {
							val.type.unit = v.name;
						}
					} );
				}
			} );

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getListValues(id, item) {

		ListsValuesFactory.getList(id)
		.then( function success(data) {

			vm.listValue = angular.copy(data);
			/*vm.typeProduct.fields[item].type.listValue = angular.copy(data);*/

			var value = vm.listValue.find( function(val) {
							return ( val.id === parseInt(vm.product.fields[item]) );
						} );
			vm.product.fields[item] = angular.copy(value['name']);
			
		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function close() {

		$('main > .container').css("overflow", "");
		$('.highlight.centered.table.products.responsive-table').css("display", "");
		$('.side-nav-right').css("overflow", "");
		$('.products.header').css('display', '');
		$('.products > .pagination').parent().css('display', '');
	}

	function InitGallery() {
		var counter = 0;
		return function() {

			counter++;
			if( vm.product.images.length==counter ) {
				$('.carousel').carousel();
			}
		}
	}


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "products.show") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
				$('.products.footer').css('display', '');
			}	    
		});
	
};