'use strict';

module.exports = function(app){

	app.config(['ChartJsProvider', function (ChartJsProvider) {
		// Configure all charts
		ChartJsProvider.setOptions({
			chartColors: ['#FF5252'],
			responsive: true
		});
		// Configure all line charts
		ChartJsProvider.setOptions('line', {
			showLines: true
		});
	}]);

	app.factory( 'DashboardFactory', [ '$http', '$q',
									require('./DashboardFactory') ]);

	app.controller( 'dashboardCtrl', [ '$scope', '$rootScope', '$state', 'toastr', '$timeout', 'DashboardFactory', 'statistics',
							require('./dashboardCtrl') ]);

	app.config( ['$stateProvider', function($stateProvider){

		$stateProvider.state('dashboard', {
			url: '/dashboard',
			template: require('./dashboard.html'),
			data: {
				label: "Home"
			},
			resolve: {
				statistics: [ '$q', 'DashboardFactory', 'toastr', 
				function($q, DashboardFactory, toastr) {
					var deferred = $q.defer();
					DashboardFactory.get()
					.then( (data) => {
						deferred.resolve(data);
					}, () => {
						toastr.error("Ошибка при получение данных!")
					} );
					return deferred.promise;
				} ]
			},
			controller: 'dashboardCtrl as vm'
		});

	}] );

	//app.directive('dashboard', require('./dashboard'));

};