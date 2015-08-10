(function() {
    'use strict';

    angular
        .module('shared.userToOffice')
        .factory('UserToOfficeByUser', UserToOfficeByUser);

    function UserToOfficeByUser(Resource) {
        return Resource('/userToOfficeConnector/user/:userId', { userId: '@userId' });
    }

})();
