'use strict';

module.exports = function DashboardFactory($http, $q){

	function get(beginDate, lastDate) {

		var deferred = $q.defer(),
			req = '';
		if(beginDate && lastDate) {
			req = 'admin/dashboard/statistics?begindate='+ beginDate + '&lastdate=' + lastDate;
		} else {
			req = 'admin/dashboard/statistics';
		}

		$http.get( req )
			.then( function success(response){

				deferred.resolve(response.data);
			},
			function error(response) {

				deferred.reject('Error Server!');
			} );
		return deferred.promise;
	}


	return {

		get	: get

	}

};