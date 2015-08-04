(function() {
    'use strict';

    angular
        .module('model')
        .factory('PeopleModel', PeopleModel);

    function PeopleModel(Model) {
        return Model('/people/:id', { id: '@id' });
    }

})();