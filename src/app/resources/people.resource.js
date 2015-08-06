(function() {
    'use strict';

    angular
        .module('resource')
        .factory('People', People);

    function People(Resource) {
        return Resource('/people/:id', { id: '@id' });
    }

})();