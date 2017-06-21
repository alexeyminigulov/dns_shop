'use strict';

module.exports = function DelCategoriesFactory($http, $q, CategoriesFactory){


	function submit(data) {

		var deferred = $q.defer()/*,
			fd = new FormData()*/;

		/*for (var key in data) {
			fd.append(key, data[key]);
		}*/

		$http({
			method 			 : 'DELETE',
			url    			 : 'admin/categories/' + data._id,
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity
			//data			 : fd
		})
			.then( function success(response){

				deferred.resolve(response.data);

				if(response.data.status === 200) {

					CategoriesFactory.deleteTreeCategories(data._id);
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