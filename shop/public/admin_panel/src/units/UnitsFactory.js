'use strict';

module.exports = function UnitsFactory($http, $q){

	var units = null;


	function get() {

		var deferred = $q.defer();

		if(units) {
			
            deferred.resolve(units);
            return deferred.promise;
        }

		$http.get('admin/units')
			.then( function success(response){

				if(units === null) units = response.data;
				deferred.resolve(response.data);
			},
			function error(response) {

				deferred.reject('Units not found!');
			} );
			
		return deferred.promise;
	}

	function submit(data) {
		var deferred = $q.defer();

		$http.post('admin/units', {name: data})
			.then( function success(response){

				if(response.data.status === 200) {
					units.push( response.data.unit );
					deferred.resolve(units);
				} else
					deferred.reject("Ошибка на сервере!");
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}

	function deleteUnit(id) {
		var deferred = $q.defer();

		$http.delete('admin/units/' + id)
			.then( function success(response){

				if(response.data.status === 200) {
					
					deferred.resolve();
				} else {
					deferred.reject(response.data.msg);
				}
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}



	return {

		get			: get,
		submit		: submit,
		deleteUnit	: deleteUnit

	}

};