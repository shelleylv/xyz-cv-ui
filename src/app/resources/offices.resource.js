(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Offices', Offices);

    function Offices(Resource) {
        return Resource('/office/:id', { id: '@id' });
    }

})();
