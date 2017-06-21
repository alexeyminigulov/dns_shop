'use strict';

module.exports = function(app){

    app.directive('canvasDrawImage', [ '$parse',
    								 require('./canvasDrawImage') ]);

}