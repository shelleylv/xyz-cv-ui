(function() {
    'use strict';

    angular
        .module('shared.userToOffice')
        .factory('UserToOffice', UserToOffice);

    function UserToOffice(Resource) {
        return Resource('/userToOfficeConnector/:_id', { _id: '@_id' });
    }

})();
