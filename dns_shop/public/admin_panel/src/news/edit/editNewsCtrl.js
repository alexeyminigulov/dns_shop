'use strict';

module.exports = function unitsCtrl( $timeout, $rootScope, $scope, $state, $stateParams, 
                    				NewsFactory, toastr ){

	var vm = this,
		id = $state.params.id;

    vm.news = {};
    vm.bootstrap = require('./../bootstrap.css');
    vm.closeSideNavRight = closeSideNavRight;
    vm.editNewsSubmit = editNewsSubmit;


    init();

	function init() {

		getNews();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function close() {

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
	}

	function getNews() {

		NewsFactory.getById(id)
		.then( function success(data) {

			vm.news = data;
			$timeout( function(){Materialize.updateTextFields();}, 100 );

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	function closeSideNavRight($event) {
		if($event) $event.preventDefault();

		document.querySelector('.side-nav-right').classList.add('close-side-nav-right');
		document.querySelector('.side-nav-right .header > .fixed-action-btn').classList.add('close');

		$timeout( function(){ $state.go('news'); }, 300 );
	}

	function editNewsSubmit(e) {
		if(e) e.preventDefault();

		NewsFactory.edit(id, vm.news)
		.then( function success(data) {

			toastr.success(data.msg);
			$scope.$emit( 'renderViewNews', data.news, 'update' );
			closeSideNavRight(null);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}



    $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "news.edit") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});
    
};