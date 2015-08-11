 (function() {
    'use strict';

    angular
        .module('shared.accesses')
        .factory('Accesses', Accesses);

    function Accesses(Resource) {
        return Resource('/roleToAttributeConnector/');
    }

 })();
