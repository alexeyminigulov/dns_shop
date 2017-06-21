'use strict';

module.exports = function(app){

	require('./styles.css');

    app.directive('msLayout', require('./layout'));

};