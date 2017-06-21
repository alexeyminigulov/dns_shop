'use strict';

module.exports = function requisitionCtrl($rootScope, $scope, $state, $stateParams,
					toastr, RequestFactory) {

	var vm = this;

	vm.requisition = [
						//{ id: 1, customer: "Vasya", date: "10.10.2012", status: "В обработке", products: [ { id: 1, name: "iPhone4s", amounter: 4 }, { id: 2, name: "iPhone6s", amounter: 1 } ] },
						//{ id: 2, customer: "Petya", date: "12.12.2012", status: "Отклонена", products: [ { id: 1, name: "iPhone4s", amounter: 4 }, { id: 2, name: "iPhone6s", amounter: 1 } ] }
					 ];

	inite();

	function inite() {

		getRequest();
	}

	function getRequest() {

		RequestFactory.get()
		.then( function success(data){
			
			vm.requisition = data;
			console.log(data);

		}, function error(msg) {

			toastr.error(msg);
		} );
	}

	$scope.$on('RequestRenderView', function (event, obj) {

			console.log(obj);
			for(var i = 0, length = vm.requisition.length; i < length; i++) {
				if(vm.requisition[i].id === obj.id) {
					vm.requisition[i].status = (obj.state === 1) ? "обработана" : "откланена";
					return;
				}
			}
		});
	

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			
		});

};