'use strict';

module.exports = function Configuration($location){

        return {

            getUrl : function() {

                return $location.path();
            }

        }

};