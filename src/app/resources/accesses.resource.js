 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Accesses', Accesses);

    function Accesses(Resource) {
        return Resource('/roleToAttributeConnector/');
    }

 })();
