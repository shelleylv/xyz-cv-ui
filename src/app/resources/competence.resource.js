(function() {
    'use strict';

    angular
        .module('resource')
        .factory('Competence', Competence);

    function Competence(Resource) {
        return Resource('/competence/:_id', { _id: '@_id' });
    }

})();