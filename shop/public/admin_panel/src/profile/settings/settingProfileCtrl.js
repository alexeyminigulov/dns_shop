'use strict';

module.exports = function settingProfileCtrl( $scope, $rootScope, ProfileFactory, toastr, $timeout, $state ){

	var vm = this;
	vm.user = {};

	vm.submit = submit;

	init();

	function init() {

		getUser();
	}

	function getUser() {

		ProfileFactory.get()
		.then( function success(data) {
			vm.user = angular.copy(data);
			vm.user.birth_date = new Date(data.birth_date);
			$timeout( function() {

				Materialize.updateTextFields();

				var $input = $('.datepicker').pickadate({
					selectMonths: true,
					selectYears: 15,
					format: 'dd-mm-yyyy',

					// Buttons
					today: 'Сегодня',

					onSet: () => {
						vm.user.birth_date = $('.datepicker').val();
						// $scope.$digest();
					}
				});
				var picker = $input.pickadate('picker');
				picker.set( 'select', angular.copy(vm.user.birth_date) );

			}, 100 );

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function submit(e) {
		if(e) e.preventDefault();

		ProfileFactory.submit(vm.user)
		.then( function(msg) {

			toastr.success(msg);
			$scope.$emit('updateImgSideNav');
			$state.go("dashboard");

		}, function error(msg) {

			toastr.error(msg);
			// $state.go("dashboard");
		} );
	}
    
};