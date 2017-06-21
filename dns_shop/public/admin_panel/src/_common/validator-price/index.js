'use strict';

module.exports = function(app){

    app.directive('validatorPrice', [ '$rootScope', '$parse',
    								 require('./validatorPrice') ]);

}