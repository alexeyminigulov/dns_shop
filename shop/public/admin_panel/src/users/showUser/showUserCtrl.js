'use strict';

module.exports = function showUserCtrl($rootScope, $scope, $state, $stateParams, $timeout,
									toastr, UserFactory) {

	var vm = this,
    	modelHeightCreate;

	vm.user  = {};
	vm.roles = [];

	vm.closeModalUser = closeModalUser;

	UserFactory.getById($state.params.id)
		.then( function success(data){

			vm.user = angular.copy(data);
			vm.user.role_id = vm.user.role_id + '';

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );

	UserFactory.getRoles()
		.then( function success(data) {

			vm.roles = data;

		}, function error(msg) {

			toastr.error(msg);
			$state.go('^');
		} );


	loadModal();
	/*
	 *@run modal window "Edit User"
	 */
	function loadModal() {

		$('select').select2();
		$('.input-field.select2 span.select2').css("width", "");

		$('#modal-show-user').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');

		// For set paranga
		$('.lean-overlay').css('display', 'none');
	}

	document.querySelector('.paranga').onclick = function(e) {
		closeModal('categories');
	};

	/*
	 *@close modal window "Edit User"
	 */
	function closeModal(state) {

		$('#modal-show-user').closeModal();
		$('nav.top-nav.fixed').css('z-index', '');

		// For set paranga
		$('.paranga').css( 'display', '' );
		$('.paranga').css( 'bottom', '' );

		$timeout( function() {
					$('#slide-out').css('z-index', '');
					$state.go(state);
				}, 200 );
	}

	function closeModalUser($event) {

		if($event) $event.preventDefault();
		closeModal("users");
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			$rootScope.$$listeners.$stateChangeStart = [];
			if(toState.name === "users.show") {
				loadModal();
			} else {
				closeModal(toState.name);
			}
		});

};