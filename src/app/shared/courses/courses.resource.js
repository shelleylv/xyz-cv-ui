(function() {
    'use strict';

    angular
        .module('shared.courses')
        .factory('Courses', Courses);

    function Courses(Resource) {
        return new Resource('/course/:_id', { _id: '@_id' });
    }

})();
