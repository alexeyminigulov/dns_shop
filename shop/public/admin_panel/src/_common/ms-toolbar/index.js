'use strict';

module.exports = function(app){

	require('./styles.css');

    app.directive('msToolbar', require('./toolbar'));

    app.directive('msSearch', [ '$state', require('./search/search') ]);

}