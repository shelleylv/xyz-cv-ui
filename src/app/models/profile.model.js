(function() {
    'use strict';

    angular
        .module('model')
        .factory('ProfileModel', ProfileModel);

    function ProfileModel(Model) {
        return Model('/profile/:_id', { _id: '@_id' });
    }

})();
