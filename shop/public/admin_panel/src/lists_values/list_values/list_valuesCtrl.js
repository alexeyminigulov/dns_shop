'use strict';

module.exports = function list_valuesCtrl( $state, $stateParams, ListsValuesFactory, toastr ){

	var vm = this,
		idList = parseInt($stateParams.id);

	vm.newValue = {};
	vm.newValue.id = idList;
	vm.list_values = [];
	vm.submitValue = submitValue;
	vm.deleteValue = deleteValue;

	ListsValuesFactory.getList( idList )
		.then( function success(data){

			vm.list_values = data;
			// if(!data.length)
			// 	$state.go('lists-values');

		}, function error(msg){

			toastr.error(msg);
		} );

	function submitValue(e) {
		e.preventDefault();

		ListsValuesFactory.submitValue(vm.newValue)
			.then( function success(data){

				vm.list_values = data;
				vm.newValue.name = "";

			}, function error(msg){

				toastr.error(msg);
			} );
	}

	function deleteValue(e, id) {
		e.preventDefault();

		ListsValuesFactory.deleteValue(id, idList)
			.then( function success(data){

				vm.list_values = data;

			}, function error(msg){

				toastr.error(msg);
			} );
	}
    
};