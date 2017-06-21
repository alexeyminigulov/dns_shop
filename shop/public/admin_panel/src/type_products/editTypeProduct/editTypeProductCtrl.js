'use strict';

module.exports = function editCtrl($scope, $timeout, $state, $rootScope, TypeProductsFactory, EditTypeProductsFactory, toastr){

	var vm = this,
		oldValueTP = {};

	vm.id = $state.params.id;

	vm.closeSideNavRight = closeSideNavRight;

	vm.submitEditTypeProduct = submitEditTypeProduct;

	vm.typeProduct = {};


	TypeProductsFactory.getById(vm.id)
		.then(function successCallback(data) {

				vm.typeProduct = data;
				oldValueTP = clone(data);

			}, function errorCallback(msg) {

				toastr.error(msg);
				$state.go('^');
			} );



	init();

	function init(){

		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function close(){

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
	}

	function closeSideNavRight($event) {

		if($event) $event.preventDefault();

		document.querySelector('.side-nav-right').classList.add('close-side-nav-right');
		document.querySelector('.side-nav-right .header > .fixed-action-btn').classList.add('close');

		$timeout( function(){ $state.go('^'); }, 300 );
	}



	function submitEditTypeProduct(e) {

		e.preventDefault();
		
		function changeTypeProduct() {
			for (var attr in vm.typeProduct) {
				if (oldValueTP.hasOwnProperty(attr))
					vm.typeProduct[attr] = oldValueTP[attr];
				else
					delete vm.typeProduct[attr];
			}
		}

		EditTypeProductsFactory.submit( vm.typeProduct )
			.then(function success(data) {

					if(data.status === 200) {

						$scope.$emit('editTypeProduct', vm.typeProduct, vm.$index);
						toastr.success('Изменения применены!');
						$scope.$emit( 'renderViewTP' );
					} else {
						changeTypeProduct();
						toastr.error('Ошибка на сервере!');
					}
					closeSideNavRight(null);

				}, function error(msg) {

					changeTypeProduct();
					toastr.error(msg);
					closeSideNavRight(null);
				});
	}


	$(document).ready(function() {

		$('select').material_select();
		$('.collapsible').collapsible({ accordion : false });
	});


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "type-products.edit") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}	    
		});


	function clone(obj) {
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	}
	
};