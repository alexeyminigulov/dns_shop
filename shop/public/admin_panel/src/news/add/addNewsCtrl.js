'use strict';

module.exports = function newsCtrl( $scope, $rootScope, $timeout, $state, 
									textAngularManager, AddNewsFactory, toastr ){

    var vm = this;

    vm.newsItem = {};
    vm.bootstrap = require('./../bootstrap.css');
    vm.closeSideNavRight = closeSideNavRight;
    vm.newNewsSubmit = newNewsSubmit;


    init();

	function init() {

		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function close() {

		$('main > .container').css("overflow", "");
		$('.side-nav-right').css("overflow", "");
	}

	function closeSideNavRight($event) {
		if($event) $event.preventDefault();

		document.querySelector('.side-nav-right').classList.add('close-side-nav-right');
		document.querySelector('.side-nav-right .header > .fixed-action-btn').classList.add('close');

		$timeout( function(){ $state.go('news'); }, 300 );
	}

	function newNewsSubmit(e) {
		if(e) e.preventDefault();

		AddNewsFactory.submit(vm.newsItem)
		.then( function success(msg) {

			toastr.success(msg);
			$scope.$emit( 'renderViewNews' );
			closeSideNavRight(null);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

    //	Seting textEditor Example
    vm.version = textAngularManager.getVersion();
    vm.versionNumber = vm.version.substring(1);
    vm.orightml = '';
    vm.htmlcontent = vm.orightml;
    vm.disabled = false;



    $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "news.add") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}
		});
    
};