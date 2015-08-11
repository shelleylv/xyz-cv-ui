(function() {
    'use strict';

    angular
        .module('core.session')
        .factory('Authentication', Authentication);

    function Authentication(Resource) {
       return Resource('/authentication/:id', { id: '@id' });
    }

})();
