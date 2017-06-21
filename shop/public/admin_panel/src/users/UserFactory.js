'use strict';

module.exports = function UserFactory($http, $q){

	var users = null,
		roles = null;


	function get() {

		var deferred = $q.defer();

		if(users) {
			
			deferred.resolve(users);
			return deferred.promise;
		}

		$http.get('admin/users')
			.then( function success(response){

				users = response.data;
				deferred.resolve(users);
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}

	function getById(id){

		function setUserById() {

			function catchUserById(val) {
				return id == val.id;
			}

			user = users.find( catchUserById );
			if(user) {
				deferred.resolve(user);
			} else {
				deferred.reject('User not found.');
			}
		}

		var deferred = $q.defer(),
			user = null;

		if(users === null) {

			get().then( function success(response){

				setUserById();
			}, function error(response){} );

			return deferred.promise;
		}

		setUserById();

		return deferred.promise;
	}

	function getRoles() {

		var deferred = $q.defer();

		if(roles) {
			
			deferred.resolve(roles);
			return deferred.promise;
		}

		$http.get('admin/roles')
			.then( function success(response){

				roles = response.data;
				deferred.resolve(roles);
			},
			function error(response) {

				deferred.reject('Упс. Роли не получены!');
			} );
			
		return deferred.promise;
	}

	function editRole(user) {
		user.role_id = parseInt(user.role_id);

		var deferred = $q.defer();

		$http.post('admin/users', {user_id: user.id, role_id: user.role_id})
			.then( function success(response){
				
				updateUsersRole(user);
				deferred.resolve("Роль изменена!");
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}

	function updateUsersRole(user) {

            for(var i = 0, length = users.length; i < length; i++) {

                if( users[i].id != user.id ) continue;

                users[i].role_id = user.role_id;
            }
        }


	return {

		get		 : get,
		getById  : getById,
		getRoles : getRoles,
		editRole : editRole

	}

};