'use strict';

module.exports = function createProductsCtrl($timeout, $rootScope, $scope, $state, $stateParams,
					CreateProductsFactory, TypeProductsFactory, UnitsFactory,
					ListsValuesFactory, ManufacturerFactory, toastr){

	var vm = this,
		semanticUrl 	= $state.params.semanticUrl;

	vm.product = {};
	vm.product.fields = [];
	vm.product.images = [];
	vm.manufacturers  = [];
	vm.fields = {};
	vm.units = [];
	vm.listsValue  = [];
	vm.typeProduct = {};
	vm.close   	   = close;
	vm.submit  	   = submit;
	vm.toInt   	   = toInt;
	vm.addPhoto	   = addPhoto;
	vm.delImage	   = delImage;


	init();

	function init() {

		getTypeProduct();
		getManufacturer();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
		$('.highlight.centered.table.products.responsive-table').css("display", "none");
	}

	function getTypeProduct(){

		TypeProductsFactory.getOneTypeProduct('semanticUrl', semanticUrl)
			.then( function success(data){

				vm.typeProduct = data;
				//console.log(data);
				getUnits();
				getListsValue();

			}, function error(msg){

				toastr.error(msg);
				$state.go("^");
			} );
	}

	function getManufacturer() {

		ManufacturerFactory.get()
		.then( function success(data) {

			vm.manufacturers = angular.copy(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function getUnits() {

		UnitsFactory.get()
		.then( function success(data){

			vm.units = angular.copy(data);
			vm.typeProduct.fields.forEach( function(val, i){
				if(val.type.name === 'integer'){
					vm.units.find( function(v){
						if(v.id == val.type.unit) {
							val.type.unit = v.name;
						}
					} );
				}
			} );

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function getListsValue() {

		ListsValuesFactory.get()
		.then( function success(data){

			vm.listsValue = data;
			//console.log(data);
			getValues();

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function getValues() {

		vm.typeProduct.fields.forEach( function(val) {
			if( val.type.name === 'list' ) {

				ListsValuesFactory.getList(val.type.listValue)
					.then( function success(data){

						val.type.values = data;
						
					}, function error(msg){

						toastr.error(msg);
					} );
			}
			//console.log(vm.typeProduct);
		} );
	}

	function addPhoto() {
		var file = event.target.files[0],
			photoHTML = document.querySelector('.photo.create-product');
		if( !file || file.type.indexOf('image') == -1 )
		{
			toastr.warning('Должно быть изображение!', 'Warning');
			return;
		}

		if( vm.product.images.find( function(val){ return val.name===file.name; } ) )
			return;

		function getSize(file) {
			return new Promise( function(resolve, reject) {
				var img = new Image();
				img.onload = function() {
					resolve(this);
				};
				img.src = URL.createObjectURL(file);
			});
		}

		getSize(file).then( (data)=>{
			if(data.width < 1000 || data.height < 1000) {
				toastr.warning('Маленькое изображение!', 'Warning');
				return;
			}

			vm.product.images.push(file);
			$scope.$digest();
		} );
	}

	function delImage(file) {

		for(var i = 0, length = vm.product.images.length; i<length; i++) {
			if( vm.product.images[i].name===file.name ) {
				vm.product.images.splice(i, 1);
				return;
			}
		}
	}

	function close(e) {
		if(e)
			e.preventDefault();

		$state.go("^");
	}

	function submit(e) {
		e.preventDefault();

		vm.product.type_product_id = vm.typeProduct._id;
		vm.product.amount = 0;
		//console.log(vm.product);
		CreateProductsFactory.submit(vm.product, semanticUrl)
		.then( function success(msg){

			toastr.success(msg);
			$scope.$emit( 'ProductRenderView' );
			close();

		}, function error(msg){

			toastr.error(msg);
			close();
		} );
	}

	function toInt(index) {
		var select,
			caption;

		vm.product.fields[index] = parseInt( vm.fields[index] );
	}

	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "products.create") {
				$rootScope.$$listeners.$stateChangeStart = [];
				$('main > .container').css("overflow", "");
				$('.side-nav-right').css("overflow", "");
				$('.highlight.centered.table.products.responsive-table').css("display", "");
			}	    
		});

};