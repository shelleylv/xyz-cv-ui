(function() {
    'use strict';

    angular
        .module('shared.userToCourse')
        .factory('UserToCourse', UserToCourse);

    function UserToCourse(Resource) {
        return new Resource('/userToCourseConnector/:_id', { _id: '@_id' });
    }

})();
