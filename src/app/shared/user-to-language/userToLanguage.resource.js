(function() {
    'use strict';

    angular
        .module('shared.userToLanguage')
        .factory('UserToLanguage', UserToLanguage);

    function UserToLanguage(Resource) {
        return new Resource('/userToLanguageConnector/:_id', { _id: '@_id' });
    }

})();
