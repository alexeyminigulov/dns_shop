'use strict';

module.exports = function editUserCtrl($rootScope, $scope, $state, $stateParams, $timeout,
									toastr, UserFactory) {

	var vm = this,
		roleId,
		modelHeightCreate;

	vm.user  = {};
	vm.roles = [];

	vm.editUserSubmit = editUserSubmit;
	vm.closeModalUser = closeModalUser;

	UserFactory.getById($state.params.id)
		.then( function success(data){

			vm.user = angular.copy(data);
			roleId  = vm.user.role_id;
			vm.user.role_id = vm.user.role_id + '';
			// console.log(vm.user);

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );

	UserFactory.getRoles()
		.then( function success(data) {

			vm.roles = data;
			// console.log(vm.roles);

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

		$('#modal-edit-user').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');

		// For set paranga
		$('.lean-overlay').css('display', 'none');

	}

	document.querySelector('.paranga').onclick = function(e) {
		closeModal('categories');
	};

	function editUserSubmit(e) {
		e && e.preventDefault();

		if( vm.roles.find( (obj)=>{ return roleId==obj.id } ).name == 'admin' ) {
			toastr.error("Нет прав на изменение параметров!");
			$state.go("^");
			return;
		}

		UserFactory.editRole(vm.user)
			.then( function success(msg) {

				toastr.success(msg);
				$state.go("^");

			}, function error(msg) {

				toastr.error(msg);
				$state.go("^");
			} );
	}

	/*
	 *@close modal window "Edit User"
	 */
	function closeModal(state) {

		$('#modal-edit-user').closeModal();
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
			if(toState.name === "users.edit") {
				loadModal();
			} else {
				closeModal(toState.name);
			}
		});

};