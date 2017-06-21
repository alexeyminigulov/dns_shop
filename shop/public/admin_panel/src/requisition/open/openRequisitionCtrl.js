'use strict';

module.exports = function openRequisitionCtrl($rootScope, $scope, $timeout, $state, $stateParams,
					toastr, RequestFactory) {

	var vm = this,
		id = +$state.params.id;

	vm.request = {};

	vm.submit = submit;



	inite();

	function inite() {

		getRequestById();
	}

	function getRequestById() {

		RequestFactory.getById(id)
		.then( function success(data){
			
			vm.request = data;
			console.log(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}


	vm.closeModalCategory = closeModalCategory;

	loadModal();

	function loadModal() {

		$('select').select2();
		$('.input-field.select2 span.select2').css("width", "");

		$('#modal-new-category').openModal();
		$('#slide-out').css('z-index', '1');
		$('nav.top-nav.fixed').css('z-index', '1');
		$('.lean-overlay').css('display', 'none');
	}

	function closeModal() {

		$('#modal-new-category').closeModal();
		$('#slide-out').css('z-index', '');
		$('nav.top-nav.fixed').css('z-index', '');

		$timeout( function(){ $state.go('requisition'); }, 200 );
	}

	function closeModalCategory($event) {

		if($event) $event.preventDefault();
		closeModal();
	}

	function submit($event, state) {
		if($event) $event.preventDefault();

		RequestFactory.submit(id, state)
		.then( function success(state){
			
			toastr.success("Ready");
			$scope.$emit( 'RequestRenderView', { state: state, id: id } );
			$state.go('^');

		}, function error(msg) {

			toastr.error(msg);
		} );
	}
	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			$rootScope.$$listeners.$stateChangeStart = [];
			if(toState.name === "requisition.open") {
				loadModal();
			} else {
				closeModal();
			}
		});

};