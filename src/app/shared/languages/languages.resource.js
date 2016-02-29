(function() {
    'use strict';

    angular
        .module('shared.languages')
        .factory('Languages', Languages);

    function Languages(Resource) {
        return new Resource('/language/:_id', { _id: '@_id' });
    }

})();
