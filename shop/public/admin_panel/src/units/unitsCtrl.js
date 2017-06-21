'use strict';

module.exports = function unitsCtrl( $scope, $rootScope, UnitsFactory, toastr ){

	var vm = this;

	vm.unit = "";
	vm.submit = submit;
	vm.deleteUnit = deleteUnit;

	UnitsFactory.get()
		.then( function success(data) {

			vm.units = data;
		},
		function error(msg) {

			toastr.error(msg);
		} );

	function submit(e) {
		e.preventDefault();

		UnitsFactory.submit(vm.unit)
			.then( function success(data) {

				vm.units = data;
				vm.unit = "";
			},
			function error(msg) {

				toastr.error(msg);
			} );
	}

	function deleteUnit(e, id) {
		e.preventDefault();

		UnitsFactory.deleteUnit(id)
			.then( function success() {

				vm.units.forEach(function(val, i){
					if(val.id === id) {
						vm.units.splice(i, 1);
						return;
					}
				});
			},
			function error(msg) {

				toastr.error(msg);
			} );
	}
    
};