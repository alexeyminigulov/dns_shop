'use strict';

module.exports = function productsCtrl($timeout, $rootScope, $scope, $state, $stateParams,
					ProductsFactory, TypeProductsFactory, UnitsFactory, toastr, typeProduct, units, products){

	var vm = this,
		page = 1,
		screenIsPhone = false,
		url = $stateParams.semanticUrl;

	vm.typeProduct = {};
	vm.products = [];
	vm.units = [];
	

	// Events Methods
	vm.pagination = pagination;

	vm.selectProduct = selectProduct();
	vm.selectedProduct = {};
	vm.showProduct = showProduct;
	vm.editProduct = editProduct;


	init();

	function init() {

		if(!url) {
			$state.go('type-products');
			return;
		}
		getTP();
		getUnits();
		getProducts();
		setHeightProducts();
		window.addEventListener("resize", setHeightProducts);
	}

	function getTP() {
		// TypeProductsFactory.getOneTypeProduct('semanticUrl', url)
		// .then(function(data) {

		// 	angular.copy(data, vm.typeProduct);

		// }, function(data) {

		// 	toastr.error(data);
		// 	$state.go('type-products');
		// } );
		angular.copy(typeProduct, vm.typeProduct);
	}

	function getUnits() {
		// UnitsFactory.get()
		// .then( function succes(data){

		// 	vm.units = data;

		// }, function error(data){

		// 	toastr.error("Error " + data);
		// } );
		angular.copy(units, vm.units);
	}

	function getProducts() {

		// ProductsFactory.get(url)
		// 	.then(function successCallback(data) {

		// 			page += 1;
		// 			angular.copy(data, vm.products);

		// 		}, function errorCallback(data) {

		// 			toastr.error("Error: " +data);
		// 		});
		page += 1;
		angular.copy(products, vm.products);
	}

	function close() {

		window.removeEventListener("resize", setHeightProducts);
	}

	function setHeightProducts() {
		//if phone
		if(document.documentElement.clientWidth > 992 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.table.adaptive-table'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			//console.dir( heightWindow + '	::   ' + topCollection + '   :   ' + heightFooter + '   :   ' + colletMargBot);
			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';

			setWidthTable();
			
			function setWidthTable() {
				var table = document.querySelector('.table.adaptive-table thead'),
					item = 5;
				while(collection.clientWidth-10 > table.clientWidth) {
					$('th').css('padding', '15px '+ item + 'px');
					item += 1;
				}
			}
			
		});
	}

	function showLoading() {
		var mainView = document.querySelector('.main-view'),
			spinner = document.createElement('div');

		spinner.innerHTML = `<div class="spinner">
								<div class="dot1"></div>
								<div class="dot2"></div>
							</div>`;
		spinner.className = 'spinner';

		Array.prototype.forEach.call( mainView.children, (element) => {
			$(element).css( {
				'display' : 'none'
			} );
		} );
		mainView.appendChild( spinner );
	}

	function showProduct(id) {
		$state.go( "products.show", {  id : id  } );
		showLoading();
	}

	function editProduct(id) {
		$state.go( "products.edit", {  id : id  } );
		showLoading();
	}

	function selectProduct() {
		var groupButtons = document.querySelector('.products.footer > .group-buttons'),
			oldProductId = null;
		return function(product, option) {

			option = option || 'select';
			if(typeof product === 'object') vm.selectedProduct = product;

			if(option === 'select')
			if(oldProductId === product.id || oldProductId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {

					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldProductId = product.id;
					else
						oldProductId = null;
				});
			}
			else {
				oldProductId = product.id;
			}

			if(!oldProductId)
				return;

			if(option === 'edit') {

				$state.go( "products.edit", {  id : vm.selectedProduct.id  } );
				showLoading();
			}

			if(option === 'open') {

				$state.go( "products.show", {  id : vm.selectedProduct.id  } );
				showLoading();
			}

			if(option === 'delete') {
				$state.go( "products.delete", {  id : vm.selectedProduct.id  } );
			}

		}
	}

	function pagination(e) {
		if(e) e.preventDefault();
		var searchValue = document.querySelector('.search input').value;

		if( !searchValue.length ) {

			ProductsFactory.pagination(url, page)
			.then( function success(data){

				vm.products = vm.products.concat(data);
				page++;

			}, function error(msg){

				toastr.error(msg);
			} );
		} 
		else {
			page++;
			ProductsFactory.search( getParams(searchValue, page), page )
			.then(function(data) {

				vm.products = vm.products.concat(data);

			}, function(data) {
				toastr.error(data);
			} );
		}
	}

	$scope.$on('ProductRenderView', function () {

			getProducts();
		});

	$scope.$on('searchProductByName', function (event, val) {
		page = 1;

		if(val === '') {
			ProductsFactory.search( undefined, url )
				.then(function(data) {

					angular.copy(data, vm.products);
					page++;

				}, function(data) {
					toastr.error(data);
				} );
			return;
		} 
		ProductsFactory.search( getParams(val, page) )
			.then(function(data) {

				angular.copy(data, vm.products);

			}, function(data) {
				toastr.error(data);
			} );
		
	});

	function getParams(val, page) {
		var params = {
						"type_product_id" : vm.typeProduct._id,
						name			  : val,
						semanticUrl		  : url,

						toString : function() {
							var str = '';
							for(var key in this) {
								if ( key !== 'toString' )
									str += key + '=' + this[key] + '&';
							}
							return str.slice(0, -1);
						}
					 };
		return params.toString()+'?page='+page;
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "products") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name == "products") {
				$rootScope.$$listeners.$stateChangeStart = [];
				$('.products.header .fixed-action-btn').css('display', '');
				$('.products.footer').css('display', '');
				setHeightProducts();
			}
			if(toState.name != "products") {
				$rootScope.$$listeners.$stateChangeStart = [];
				$('.products.header .fixed-action-btn').css('display', 'none');
			}
		});

};