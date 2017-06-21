'use strict';

module.exports = function editProductCtrl($scope, $timeout, $state, $rootScope, UnitsFactory,
					TypeProductsFactory, ProductsFactory, EditProductFactory, 
					ListsValuesFactory, ManufacturerFactory, toastr){

	var vm          	= this,
		productId   	= $state.params.id,
		oldValueProduct = {},
		semanticUrl 	= $state.params.semanticUrl;

	// Событийные методы
	vm.close  		= close;
	vm.submit 		= submit;
	vm.isServerImage= isServerImage;
	vm.delImage		= delImage;
	vm.addPhoto		= addPhoto;

	vm.product 		= {}; 		//  [name, ..., price, fields: []]
	vm.typeProduct  = {};		//  {_id, name, semanticUrl, fields: [{name,type}, {name,type}]}
	vm.units		= [];
	vm.manufacturers= [];



	init();

	function init() {

		$rootScope.hideLoading();
		$('main > .container').css("overflow", "visible");
		$('.highlight.centered.table.products.responsive-table').css("display", "none");
		$('.side-nav-right').css("overflow", "visible");
		$('.products > .pagination').parent().css('display', 'none');
		$('.products.header > *').css('display', 'none');
		$('.products.footer').css('display', 'none');
		getManufacturer();
	}

	ProductsFactory.getById( parseInt(productId), semanticUrl )
		.then( function success(data){

			vm.product = data;
			vm.product.manufacturer_id = vm.product.manufacturer_id.toString();
			oldValueProduct = angular.copy(data);
			//console.log(vm.product);
			getTypeProduct();

		}, function error(msg){

			toastr.error(msg);
			$state.go("^");
		} );

	function getTypeProduct(){

		TypeProductsFactory.getById(vm.product.type_product_id)
			.then( function success(data){
				//console.log(data);
				vm.typeProduct = angular.copy(data);
				setFields();

			}, function error(msg){

				toastr.error(msg);
				$state.go("^");
			} );
	}

	function setFields() {

		vm.typeProduct.fields.forEach( function(val, i) {
			if(val.type.name === "list") {
				
				vm.product.fields[i] = vm.product.fields[i].toString();
				getListValues( val.type.listValue, i );
			}
			else if(val.type.name === "integer") {
				getUnits();
			}
		} );
		//console.log(vm.typeProduct);
	}

	function getListValues(id, item) {
		
		ListsValuesFactory.getList(id)
		.then( function success(data) {
			
			/*console.log(data);
			var value = angular.copy(data).find( function(val) {
							return ( val.id === parseInt(vm.product.fields[item]) );
						} );*/
			vm.typeProduct.fields[item].type.values = angular.copy( data );
			
		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getUnits() {

		UnitsFactory.get()
		.then( function success(data) {
			
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

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );
	}

	function getManufacturer() {

		ManufacturerFactory.get()
		.then( function success(data) {

			vm.manufacturers = angular.copy(data);
			//console.log(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function close($event) {

		if($event) $event.preventDefault();

		document.querySelector('.side-nav-right').classList.add('close-side-nav-right');
		document.querySelector('.side-nav-right .header > .fixed-action-btn').classList.add('close');

		$timeout( function(){ $state.go('products'); }, 300 );

		$('main > .container').css("overflow", "");
		$('.highlight.centered.table.products.responsive-table').css("display", "");
		$('.side-nav-right').css("overflow", "");
		$('.products > .pagination').parent().css('display', '');
		$('.products.header > *').css('display', '');
	}

	function submit(e) {

		e.preventDefault();

		function changeProduct() {
			for (var attr in vm.product) {
				if (oldValueProduct.hasOwnProperty(attr))
					vm.product[attr] = oldValueProduct[attr];
				else
					delete vm.product[attr];
			}
		}

		EditProductFactory.submit( vm.product, semanticUrl )
			.then(function success(images) {

				vm.product.images = angular.copy(images);
				toastr.success("Товар обновлен!");
				$scope.$emit( 'ProductRenderView' );
				$state.go('^');	

			}, function error(msg) {

				toastr.error(msg);
				changeProduct();
				$state.go('^');
			} );
	}

	function delImage(image) {
		// debugger;
		if( typeof image == 'object' && image.hasOwnProperty('medium') ) {
			vm.product.images.forEach( function(val, i) {

				if( (typeof val == 'object') && (val['medium'] == image['medium']) ) {

					vm.product.images.splice(i, 1);
					return;
				}
			} );
		}
		else if(typeof image == 'object') {
			vm.product.images.forEach( function(val, i) {

				if( (typeof val == 'object') && (val.name == image.name) ) {

					vm.product.images.splice(i, 1);
					return;
				}
			} );
		}
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
			//console.log(vm.product.images);
		} );
	}

	function isServerImage(val) {
		return ( (typeof (val) == 'object') && val.hasOwnProperty('medium') );
	}



	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "products.edit") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close(null);
				$('.products.footer').css('display', '');
			}	    
		});
	
};