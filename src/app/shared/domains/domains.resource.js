(function() {
    'use strict';

    angular
        .module('shared.domains')
        .factory('Domains', Domains);

    function Domains(Resource) {
        return new Resource('/domain/:_id', { _id: '@_id' });
    }

})();
