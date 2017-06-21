'use strict';

module.exports = function(app){

    app.directive('fileModel', [ '$parse',
    								 require('./fileModel') ]);

}