(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Authentication', Authentication);

    function Authentication(Resource) {
       return Resource('/authentication/:id', { id: '@id' });
    }

})();
