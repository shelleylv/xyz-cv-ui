(function() {
    'use strict';

    angular
        .module('shared.roles')
        .factory('Roles', Roles);

    function Roles(Resource) {
        return new Resource('/role/:_id', { _id: '@_id' });
    }

})();
