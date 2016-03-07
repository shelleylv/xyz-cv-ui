(function() {
    'use strict';

    angular
        .module('shared.userToCertificate')
        .factory('UserToCertificate', UserToCertificate);

    function UserToCertificate(Resource) {
        return new Resource('/userToCertificateConnector/:_id', { _id: '@_id' });
    }

})();
