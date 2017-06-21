'use strict';

module.exports = function profileFactory(){

		function getProfile(){

			return {
				firstName: 'Alexei',
				lastName: 'Minigulov',
				role: 'Administraror',
				photo: 'dist/images/nobody_profile.jpg'
			}
		}

        return {

            getProfile : getProfile

        }

};