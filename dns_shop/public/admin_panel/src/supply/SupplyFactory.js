'use strict';

module.exports = function SupplyFactory($http, $q){

	function get() {

		var deferred = $q.defer();

		$http({
			method 			 : 'GET',
			url    			 : 'admin/supply',
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity
		})
			.then( function success(data){

				deferred.resolve(data.data);

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;
	}


	function getById(id) {

		var deferred = $q.defer();

		$http({
			method 			 : 'GET',
			url    			 : 'admin/supply/' + id,
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity
		})
			.then( function success(data){

				deferred.resolve(data.data);

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;
	}


	function create(data) {

		var deferred = $q.defer();

        var fd = JSON.stringify(data);

        $http.post( 'admin/supply', fd)
			.then( function success(response){

				if(response.data.status === 200) {

					deferred.resolve(response.data);

				} else {
					deferred.reject('Ошибка на сервера!');
				}

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;
	}
	
	return {
		get     : get,
		getById : getById,
		create  : create
	}

};