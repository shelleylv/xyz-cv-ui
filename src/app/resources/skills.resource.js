(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Skills', Skills);

    function Skills(Resource) {
        return Resource('/skill/:_id', { _id: '@_id' });
    }

})();
