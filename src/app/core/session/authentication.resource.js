(function() {
    'use strict';

    angular
        .module('core.session')
        .factory('Authentication', Authentication);

    function Authentication(Resource) {
       return new Resource('/authentication/:id', { id: '@id' });
    }

})();
