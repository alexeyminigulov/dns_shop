'use strict';

module.exports = function usersCtrl($rootScope, $scope, $state, $stateParams, $timeout,
									toastr, UserFactory) {

	var vm = this,
		screenIsPhone = false;

	vm.users		= [];
	vm.userEdit		= userEdit;
	vm.userShow		= userShow;
	vm.selectUser	= selectUser();
	vm.selectedUser = {};


	init();

	function init() {

		getUsers();
		setHeightUsers();
		window.addEventListener("resize", setHeightUsers);
	}

	function getUsers() {

		UserFactory.get()
		.then( function success(data) {

			vm.users = data;
			// console.log(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function setHeightUsers() {
		//if phone
		if(document.documentElement.clientWidth > 992 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.table.adaptive-table'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			//console.dir( heightWindow + '	::   ' + topCollection + '   :   ' + heightFooter + '   :   ' + colletMargBot);
			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';

			setWidthTable();
			
			function setWidthTable() {
				var table = document.querySelector('.table.adaptive-table thead'),
					item = 5;
				while(collection.clientWidth-10 > table.clientWidth) {
					$('th').css('padding', '15px '+ item + 'px');
					item += 1;
				}
			}
			
		});
	}

	function selectUser() {
		var groupButtons = document.querySelector('.users.footer > .group-buttons'),
			oldUserId = null;
		return function(user, option) {

			option = option || 'select';
			if(typeof user === 'object') vm.selectedUser = user;

			if(option === 'select')
			if(oldUserId === user.id || oldUserId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {

					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldUserId = user.id;
					else
						oldUserId = null;
				});
			}
			else {
				oldUserId = user.id;
			}

			if(!oldUserId)
				return;

			if(option === 'edit') {

				$state.go( "users.edit", {  id : vm.selectedUser.id  } );
			}
			else if(option === 'open') {

				$state.go( "users.show", {  id : vm.selectedUser.id  } );
			}

		}
	}

	function userEdit(e, id) {
		e && e.stopPropagation();
		e && e.preventDefault();

		$state.go('users.edit', {
			id: id
		});
	}

	function userShow(e, id) {
		e && e.stopPropagation();
		e && e.preventDefault();

		$state.go('users.show', {
			id: id
		});
	}

	function close() {

		window.removeEventListener("resize", setHeightUsers);
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "users") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});

};