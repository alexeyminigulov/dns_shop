'use strict';

module.exports = function createSupplyCtrl($rootScope, $scope, $state, $stateParams,
					toastr, SupplyFactory, ProductsFactory) {

	var vm = this;

	vm.newSupply = {
		products : []
	};
	vm.product = {};

	vm.submit = submit;
	vm.removeProduct = removeProduct;
	vm.addProduct = addProduct;



	init();

	function init(){

		initTypeaHead();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function initTypeaHead() {

		var _selected;

		vm.selected = undefined;
		vm.states = [];


		vm.ngModelOptionsSelected = function(value) {
			if (arguments.length) {
			  _selected = value;
			  vm.product.name = value;
			  searchProductByName();
			} else {
			  return _selected;
			}
		};

		vm.modelOptions = {
			debounce: {
			  default: 500,
			  blur: 250
			},
			getterSetter: true
		};

	}

	function close(){

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
	}

	function addProduct(e) {
		e.preventDefault();

		vm.product.id = null;
		for(var i = 0, length = vm.states.length; i < length; i++) {
			if(vm.states[i] === vm.product.name) {
				vm.product.id = vm.statesId[i];
				break;
			}
		}
		vm.newSupply.products.push( angular.copy(vm.product) );
		vm.product = {};
		vm.ngModelOptionsSelected("");
	}

	function submit(e) {
		e.preventDefault();

		SupplyFactory.create(vm.newSupply)
			.then( function success(data) {

				toastr.success("Выполнена поставка!");
				vm.newSupply.id = data.id;
				vm.newSupply.user = { name: data.user };
				vm.newSupply.created_at = data.created_at.date;
				$scope.$emit( 'SupplyRenderView', angular.copy(vm.newSupply) );
				vm.newSupply = {};
				$state.go('^');

			}, function error(msg) {

				toastr.error(msg);
				$state.go('^');
			} );
	}

	function removeProduct(e, product) {
		e.preventDefault();

		vm.newSupply.products.forEach( function(val, i) {
			if(val.name === product.name) {
				vm.newSupply.products.splice(i, 1);
			}
		} );
	}

	function searchProductByName() {

		ProductsFactory.searchAJAX('name='+vm.product.name)
		.then( function success(data) {

			vm.states = data.map( function(val) {
				return val.name;
			} );
			vm.statesId = data.map( function(val) {
				return val.id;
			} );

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			if(toState.name !== "supply.create") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});

};