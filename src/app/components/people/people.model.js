(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.people')
        .factory('PeopleModel', PeopleModel);

    function PeopleModel(Model) {
        return Model('/people/:id', { id: '@id' });
    }

})();
