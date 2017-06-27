'use strict';

module.exports = function manufacturerCtrl($rootScope, $scope, $state, $stateParams,
									toastr, ManufacturerFactory) {

	var vm = this,
		screenIsPhone = false;

	vm.manufacturers = [];


	vm.selectManufacturer = selectManufacturer();
	vm.selectedProduct = {};


	init();

	function init() {

		getManufacturer();
		setHeightManufacturer();
		window.addEventListener("resize", setHeightManufacturer);
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

	function setHeightManufacturer() {
		//if phone
		if(document.documentElement.clientWidth > 480 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.collection.type-products'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';
		});
	}

	$scope.$on('ManufacturerRenderView', function () {

			getManufacturer();
		});

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "manufacturer") {
				$rootScope.$$listeners.$stateChangeStart = [];
				window.removeEventListener("resize", setHeightManufacturer);
			}	    
		});

};