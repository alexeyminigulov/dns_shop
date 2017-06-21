'use strict';

module.exports = function showNewsCtrl( $timeout, $rootScope, $scope, $state, $stateParams, 
                    				NewsFactory, toastr ){

	var vm = this,
		modalDelete       = document.getElementById('modal-delete-type-product'),
		header			  = document.getElementsByTagName('header'),
		parentModalDelete = modalDelete.parentNode,
		id	  			  = $stateParams.id,
		paranga           = document.createElement('div');

    vm.submit = submit;


    init();

	function init() {

		loadModal();
		$('main > .container').css("overflow", "visible");
		$('.side-nav-right').css("overflow", "visible");
	}

	function closeModal(){

		// Clear arrays StateChange...
		// $rootScope.$$listeners.$stateChangeStart = [];
		// $rootScope.$$listeners.$stateChangeSuccess = [];

		$(modalDelete).closeModal();
		parentModalDelete.removeChild( paranga );
		$(header).css('z-index', '');
	}

	function loadModal() {

		$(modalDelete).openModal();
		$(modalDelete).css('z-index', '1003');

		paranga.style.cssText=
			"position: fixed; \
			z-index: 1003; \
			opacity: 0.5; \
			left: 0; \
			top: 0; \
			right: 0; \
			bottom: 0; \
			background-color: #000; \
		  	";
		parentModalDelete.insertBefore(paranga, modalDelete);

		$(header).css('z-index', '0');
		$('.lean-overlay').css('display', 'none');
	}

	function submit(e) {
		if(e) e.preventDefault();

		NewsFactory.del(id)
		.then( function success(msg){

			toastr.success(msg);
			$scope.$emit( 'renderViewNews', id, 'delete' );
			$state.go('^');

		}, function error(msg){

			toastr.error(msg);
			$state.go('^');
		} );
	}



    $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "news.deleteNews") {
				$rootScope.$$listeners.$stateChangeStart = [];
				closeModal();
			}
		});
    
};