'use strict';

module.exports = function createCtrl($scope, $timeout, $state, $rootScope,
								TypeProductsFactory, UnitsFactory, ListsValuesFactory, toastr){

	var vm = this;

	vm.newTypeProduct = {};
	vm.newTypeProduct.fields = [];
	vm.field = {};

	vm.units = [];		//  Ед. измерение для числовых значений

	vm.listsValue = [];	//  Список подгатовленых значений для выборки

	vm.closeSideNavRight = closeSideNavRight;

	vm.createField = createField;

	vm.removeField = removeField;

	vm.submit = submit;

	init();


	function init() {

		getUnits();
		getListsValue();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function close() {

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
	}

	function getUnits() {

		UnitsFactory.get()
		.then( function success(data){

			vm.units = data;

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function getListsValue() {

		ListsValuesFactory.get()
		.then( function success(data){

			vm.listsValue = data;

		}, function error(msg){

			toastr.error(msg);
		} );
	}



	function submit($event) {

		$event.preventDefault();

		TypeProductsFactory.submitAdd(vm.newTypeProduct)
			.then( function success(data){

				toastr.success('Категория успешно создана!');
				$scope.$emit( 'renderViewTP' );
				$state.go('^');


			}, function error(msg){

				toastr.error(msg);
				$state.go('^');
			} );
	}



	function removeField($event, $index) {

		$event.stopPropagation();
		$event.preventDefault();

		vm.newTypeProduct.fields.splice($index, 1);
	}


	function closeSideNavRight($event) {

		if($event) $event.preventDefault();

		document.querySelector('.side-nav-right').classList.add('close-side-nav-right');
		document.querySelector('.side-nav-right .header > .fixed-action-btn').classList.add('close');

		$timeout( function(){ $state.go('type-products'); }, 300 );
	}


	function createField() {

		if( !vm.field.name || !vm.field.type) return;

		if( (vm.field.type === 'integer') && 
				(!vm.field.unit || !vm.field.min || !vm.field.max) )
			return;

		if( (vm.field.type === 'list' ) && (!vm.field.listValue) ) return;

		vm.newTypeProduct.fields.push(vm.field);

		vm.field = {};
	}


	$(document).ready(function() {

		$('select').material_select();

		$('.collapsible').collapsible({ accordion : false });
	});

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "type-products.create") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}	    
		});
	
};