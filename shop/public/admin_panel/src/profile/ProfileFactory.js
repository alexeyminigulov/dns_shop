'use strict';

module.exports = function ProfileFactory($http, $q, UserFactory){
	var user = null;

	function get() {
		var deferred = $q.defer();

		if(user) {
			
            deferred.resolve(user);
            return deferred.promise;
        }

		$http.get('admin/user')
			.then( function success(response){

				user = response.data;
				deferred.resolve(user);
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}

	function submit(data) {

		var deferred = $q.defer(),
			fd = new FormData();

		for (var key in data) {
			fd.append(key, data[key]);
		}

		$http.post( 'admin/user/' + data.id,
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
            })
			.then( function success(response){

				user = data;
				user.birth_date = setData( user.birth_date );

				function setData(date) {
					let arr = data.birth_date.split('-'),
						result = [];
					result.push( arr[2], arr[1], arr[0] );
					result = result.join('-');

					return result;
				}

				if( response.data.hasOwnProperty("photo") ) {

					user.photo = response.data.photo;
				}

				UserFactory.get()
				.then( function success(users) {

					var usr = users.find( (val) => {
						return val.id == user.id;
					} );
					usr && setUser(usr, data);

					function setUser(val, data) {

						val.first_name = data.first_name;
						val.last_name  = data.last_name;
						val.sex = data.sex;
						val.birth_date = data.birth_date
						val.photo = data.photo;
					}

				} );

				deferred.resolve("Данные обновлены!");

			}, function error(response){

				deferred.reject("Ошибка при обновлении!");
			} );
		return deferred.promise;
	}	


	return {

		get			: get,
		submit		: submit

	}

};