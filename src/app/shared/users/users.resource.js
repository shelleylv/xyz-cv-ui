(function() {
    'use strict';

    angular
        .module('shared.users')
        .factory('Users', Users);

    function Users(Resource) {
        return new Resource('/user/:_id', { _id: '@_id' });
    }

})();
