'use strict';

module.exports = function RequestFactory($http, $q){

	function get() {

		var deferred = $q.defer();

		$http({
			method 			 : 'GET',
			url    			 : 'admin/request',
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
			url    			 : 'admin/request/' + id,
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


	function submit(id, state) {

		var deferred = $q.defer();

        var fd = JSON.stringify({ "state" : state });

        $http.post( 'admin/request/' + id, fd)
			.then( function success(response){

				if(response.data.status === 200) {

					deferred.resolve(state);

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
		submit  : submit
	}

};