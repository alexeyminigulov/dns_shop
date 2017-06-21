'use strict';

module.exports = function($scope, $timeout, ProfileFactory, toastr, $state){

    var vm = this;

    vm.profile = {};
	vm.delegatorHideSideNav = delegatorHideSideNav;
	vm.showUser = showUser;

	getProfile();

	function getProfile() {

		ProfileFactory.get()
		.then( function success(data) {

			vm.profile = angular.copy( data );
			vm.profile.role.alias = capitalizeFirstLetter( vm.profile.role.alias );

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function delegatorHideSideNav(e){

		if( e.target.closest('.name') !== null && (e.target.closest('#show-profile')!==null) ) {

			$('.button-collapse').sideNav('hide');
		} else if( e.target.closest('.name') !== null && (e.target.closest('#show-profile')===null) ) {

			e.preventDefault();
		} else {
			
			if(e.target.classList.contains("collapsible-header")) return;
			$('.button-collapse').sideNav('hide');

			if(e.target.closest(".collapsible") === null)
				closeCollapseAll();
		}
	}

	function closeCollapseAll(){
		$(".collapsible-header").removeClass(function(){
		return "active";
		});
		$(".collapsible").collapsible({accordion: true});
		$(".collapsible").collapsible({accordion: false});
	}

	function showUser() {
		if(!vm.profile.role) return false;

		return !!vm.profile.role.permissions.find( function(val) {
			return val.name == "users.show";
		} );
	}

	$timeout( function() {
		$('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
			belowOrigin: true,
			alignment: 'right'
		});
	} );

	$scope.$on('updateImgSideNav', function (event, data) {

		getProfile();
	});

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

};