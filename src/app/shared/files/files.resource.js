(function() {
    'use strict';

    angular
        .module('shared.skills')
        .factory('Files', Files);

    function Files(Resource) {
        return new Resource('/file/:_id', { _id: '@_id' });
    }

})();
