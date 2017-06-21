'use strict';

module.exports = function validatorCreate($q, $injector){

    return {

        'request': function(config) {

            var newCategory = config.data;
            //console.log(config);

            /*if( config.method !== "POST" || config.url !== "admin/categories" ) return config;

            if( typeof newCategory === "object" && newCategory.hasOwnProperty("name") && newCategory.hasOwnProperty("semanticUrl")
                    && newCategory.hasOwnProperty("logotype") ) {
                return config;
            } else {
                console.log("Поля не заполнены");
                return;
            }*/
            return config;
        }

    }

};