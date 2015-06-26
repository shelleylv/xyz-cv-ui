 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Access', Access);

    function Access(Resource, config) {
        return Resource(config.API_URL +'/roleToAttributeConnector/');
    }

 })();
