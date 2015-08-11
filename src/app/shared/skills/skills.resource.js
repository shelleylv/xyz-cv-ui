(function() {
    'use strict';

    angular
        .module('shared.skills')
        .factory('Skills', Skills);

    function Skills(Resource) {
        return new Resource('/skill/:_id', { _id: '@_id' });
    }

})();
