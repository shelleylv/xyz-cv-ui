(function() {
    'use strict';

    angular
        .module('model')
        .factory('ProfileModel', ProfileModel);

    function ProfileModel(Model) {
        return Model('/profile/:id', { id: '@id' });
    }

})();
