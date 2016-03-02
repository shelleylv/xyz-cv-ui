(function() {
    'use strict';

    angular
        .module('shared.userToOther')
        .factory('UserToOther', UserToOther);

    function UserToOther(Resource) {
        return new Resource('/userToOtherConnector/:_id', {_id: '@_id'});
    }

})();
