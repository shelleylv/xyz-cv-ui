(function() {
    'use strict';

    angular
        .module('shared.userToAssignment')
        .factory('UserToAssignment', UserToAssignment);

    function UserToAssignment(Resource) {
        return new Resource('/userToAssignmentConnector/:_id', { _id: '@_id' });
    }

})();
