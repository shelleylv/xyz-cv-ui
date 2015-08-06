(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .factory('ProfileModel', ProfileModel);

    function ProfileModel(Model) {
        return Model('/profile/:_id', { _id: '@_id' });
    }

})();
