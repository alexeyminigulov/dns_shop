'use strict';

module.exports = function lists_valuesCtrl( $state, ListsValuesFactory, toastr ){

	var vm = this;

	vm.newList = {};
	vm.lists_values = [];
	vm.submit = submit;
	vm.deleteListValue = deleteListValue;
	vm.openValues = openValues;

	ListsValuesFactory.get()
		.then( function success(data) {

			vm.lists_values = data;
		},
		function error(msg){

			toastr.error(msg);
		} );

	function submit(e) {
		e.preventDefault();

		ListsValuesFactory.submitListsValues(vm.newList)
		.then( function success(data){

			vm.lists_values = data;
			vm.newList = {};

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function deleteListValue(e, id) {
		e.preventDefault();
		e.stopPropagation();

		ListsValuesFactory.deleteListValue(id)
		.then( function success(data){

			vm.lists_values = data;
			toastr.success("Список удален!");

		}, function error(msg){

			toastr.error(msg);
		} );
	}

	function openValues(e, id) {
		e.preventDefault();
		e.stopPropagation();

		$state.go( 'list-values', { id: id } );
	}
    
};