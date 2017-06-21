'use strict';

module.exports = function manufacturerCtrl($rootScope, $scope, $state, $stateParams,
									toastr, ManufacturerFactory) {

	var vm = this;

	vm.manufacturers = [];


	vm.selectManufacturer = selectManufacturer();
	vm.selectedProduct = {};


	init();

	function init() {

		getManufacturer();
	}

	function getManufacturer() {

		ManufacturerFactory.get()
		.then( function success(data) {

			vm.manufacturers = angular.copy(data);
			console.log(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function selectManufacturer() {
		var groupButtons = document.querySelector('.footer > .group-buttons'),
			oldManufacturerId = null;
		return function(manufacturer, option) {

			option = option || 'select';
			if(typeof manufacturer === 'object') vm.selectedManufacturer = manufacturer;

			if(option === 'select')
			if(oldManufacturerId === manufacturer.id || oldManufacturerId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {

					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldManufacturerId = manufacturer.id;
					else
						oldManufacturerId = null;
				});
			}
			else {
				oldManufacturerId = manufacturer.id;
			}

			if(!oldManufacturerId)
				return;

			if(option === 'edit') {

				$state.go( "manufacturer.edit", {  id : vm.selectedManufacturer.id  } );
			}

			if(option === 'delete') {
				$state.go( "manufacturer.delete", {  id : vm.selectedManufacturer.id  } );
			}

		}
	}

	$scope.$on('ManufacturerRenderView', function () {

			getManufacturer();
		});

};