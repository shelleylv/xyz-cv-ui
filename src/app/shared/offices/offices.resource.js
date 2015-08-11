(function() {
    'use strict';

    angular
        .module('shared.offices')
        .factory('Offices', Offices);

    function Offices(Resource) {
        return new Resource('/office/:_id', { _id: '@_id' });
    }

})();
