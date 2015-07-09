(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Skills', Skills);

    function Skills(Resource) {
        return Resource('/skill/:id', { id: '@id' });
    }

})();
