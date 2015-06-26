 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Skill', Skill);

    function Skill(Resource, config) {
        return Resource(config.API_URL +'/skill/:id', { id: '@id' });
    }

 })();
