(function() {
    'use strict';

    angular
        .module('shared.assignments')
        .factory('Assignments', Assignments);

    function Assignments(Resource) {
        return new Resource('/assignment/:_id', { _id: '@_id' });
    }

})();
