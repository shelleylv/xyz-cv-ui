(function() {
    'use strict';

    angular
        .module('shared.skills')
        .factory('Skills', Skills);

    function Skills(Resource) {
        return Resource('/skill/:_id', { _id: '@_id' });
    }

})();
