'use strict';

module.exports = function ListsValuesFactory($http, $q){
	var lists_values = null,
		values = null;


	function catchValuesById(id) {
		return function(val){
			return val.list_value_id == id;
		}
	}

	function get() {
		var deferred = $q.defer();

		if(lists_values) {
			
            deferred.resolve(lists_values);
            return deferred.promise;
        }

		$http.get('admin/lists-values')
			.then( function success(response){

				values = response.data.values;
				lists_values = response.data.lists_values;
				deferred.resolve(response.data.lists_values);
			},
			function error(response) {

				deferred.reject('Список значений не найден!');
			} );
			
		return deferred.promise;
	}

	function getList(id) {
		var deferred = $q.defer();
		
		if( lists_values ) {
			deferred.resolve( values.filter( catchValuesById(id) ) );
		}

		get()
			.then( function success(){

				deferred.resolve( values.filter( catchValuesById(id) )  );
			}, function error(msg){

				deferred.reject('Список значений не найден!');
			} );

		return deferred.promise;
	}

	function submitListsValues(data){
		var deferred = $q.defer();

		$http.post('admin/lists-values', data)
			.then( function success(response){

				if( response.data.status === 200 ) {
					lists_values.push( response.data.lists_values );
					deferred.resolve( lists_values );
				} else {
					deferred.reject(response.data.msg);
				}
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );

		return deferred.promise;
	}

	function deleteListValue(id) {
		var deferred = $q.defer();

		$http.delete('admin/lists-values/' + id)
			.then( function success(data){

				if( data.data.status === 200 ) {

					lists_values.forEach(function(val, i){
						if(val.id === id) {
							lists_values.splice(i, 1);
							return;
						}
					});
					deferred.resolve( lists_values );

				} else {

					deferred.reject(data.data.msg);
				}
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );

		return deferred.promise;
	}

	function submitValue(data){
		var deferred = $q.defer();

		$http.post('admin/values', data)
			.then( function success(response){

				if(response.data.status === 200) {
					values.push( angular.copy(response.data.value) );
					deferred.resolve( values.filter( catchValuesById(data.id) ) );
				} else
					deferred.reject(response.data.msg);
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );

		return deferred.promise;
	}

	function deleteValue(id, idList) {
		var deferred = $q.defer();

		$http.delete('admin/values/' + id)
			.then( function success(response){

				if(response.data.status === 200) {
					
					values.forEach( function(val, i) {
						if(val.id === id) {
							values.splice(i, 1);
							return;
						}
					} );
					deferred.resolve( values.filter( catchValuesById(idList) ) );

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

		get     			: get,
		getList 			: getList,
		submitListsValues	: submitListsValues,
		deleteListValue		: deleteListValue,
		submitValue			: submitValue,
		deleteValue			: deleteValue
	}

};