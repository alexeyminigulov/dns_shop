'use strict';

module.exports = function DelTypeProductFactory($http, $q, TypeProductsFactory){

	function submit(data) {

		var deferred = $q.defer();

		$http({
			method 			 : 'DELETE',
			url    			 : 'admin/type-products/' + data._id,
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity
		})
			.then( function success(response){

				deferred.resolve(response.data);

				if(response.data.status === 200) {

					TypeProductsFactory.delete(data._id);
				}

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;

	}


	return {

		submit : submit
	}

};