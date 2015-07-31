(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Offices', Offices);

    function Offices(Resource) {
        return Resource('/office/:_id', { _id: '@_id' });
    }

})();
