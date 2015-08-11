(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.people')
        .factory('PeopleModel', PeopleModel);

    function PeopleModel(Model) {
        return new Model('/people/:id', { id: '@id' });
    }

})();
