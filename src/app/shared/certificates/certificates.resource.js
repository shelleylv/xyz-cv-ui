(function() {
    'use strict';

    angular
        .module('shared.certificates')
        .factory('Certificates', Certificates);

    function Certificates(Resource) {
        return new Resource('/certificate/:_id', { _id: '@_id' });
    }

})();
