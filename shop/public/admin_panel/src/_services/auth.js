'use strict';

module.exports = function Auth($q, $http, Configuration) {

    return {

        login: function (login, password) {
            var d = $q.defer();
            if (login == 'admin' && password == 'admin') {
                $http.get('/data/users.json').then(
                    function (data) {
                        Configuration.setStorageData('user', data.data[1]);
                        d.resolve(data.data[1]);
                    }, function (error) {
                        d.reject(error)
                    }
                );
            } else {
                d.reject("Sorry, we can't find user with this login and password!")
            }
            return d.promise;
        },

        logout: function () {
            Configuration.removeStorageData('user');
        },

        user: function () {
            return Configuration.getStorageData('user');
        }

    };

};