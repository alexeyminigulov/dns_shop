'use strict';

require('./styles.css');

module.exports = function dashboardCtrl($scope, $rootScope, $state, toastr, $timeout, DashboardFactory, statistics) {

	var vm = this;

	var $inputBegin = $('.datepicker.begin-date').pickadate({
					selectMonths: true,
					selectYears: 15,
					format: 'yyyy-mm-dd',

					// Buttons
					today: 'Сегодня',

					onSet: () => {
						vm.beginDate = $('.datepicker.begin-date').val();
					}
				}),
		$inputLast = $('.datepicker.last-date').pickadate({
					selectMonths: true,
					selectYears: 15,
					format: 'yyyy-mm-dd',

					// Buttons
					today: 'Сегодня',

					onSet: () => {
						vm.lastDate = $('.datepicker.last-date').val();
					}
				});
	var pickerBegin = $inputBegin.pickadate('picker'),
		pickerLast = $inputLast.pickadate('picker');

	vm.getStatistics = getStatistics;
	vm.commonSumPurchase = 0;
	vm.countPresentProducts = 0;
	vm.countAbsenttProducts = 0;
	vm.requestUsers = 0;
	vm.showChart = false;
	

	init();

	function init() {
	
		initChart();
	}

	function initChart() {
		$scope.series = ['Рублей'];

		writeModel(statistics)
	}

	function getDashboardParams(beginDate, lastDate) {

		DashboardFactory.get(beginDate, lastDate)
		.then( (data) => {

			writeModel(data);
		}, (msg) => {
			
			toastr.error(msg);
		} );
	}

	function writeModel(data) {

		vm.showChart = (data.statisticPurchase.days.length > 0) ? true : false;
		$scope.labels = data.statisticPurchase.days;
		$scope.data = [data.statisticPurchase.purchase];

		vm.commonSumPurchase = data.commonSumPurchase;
		vm.countPresentProducts = data.countPresentProducts;
		vm.countAbsenttProducts = data.countAbsenttProducts;
		vm.requestUsers = data.requestUsers;
		vm.beginDate = data.rangeDate.beginDate;
		vm.lastDate = data.rangeDate.lastDate;
		pickerBegin.set( 'select', angular.copy(vm.beginDate) );
		pickerLast.set( 'select', angular.copy(vm.lastDate) );
	}

	function getStatistics(e) {
		if(e) e.preventDefault();

		getDashboardParams(vm.beginDate, vm.lastDate);
	}
};