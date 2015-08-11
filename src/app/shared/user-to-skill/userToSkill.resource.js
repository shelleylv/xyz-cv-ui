(function() {
    'use strict';

    angular
        .module('shared.userToSkill')
        .factory('UserToSkill', UserToSkill);

    function UserToSkill(Resource) {
        return new Resource('/userToSkillConnector/:_id', { _id: '@_id' });
    }

})();
