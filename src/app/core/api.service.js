(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.core')
        .factory('api', api);

    function api($resource, config) {
        var service = {
            post: post,
            query: query,
            get: get,
            update: update,
            remove: remove
        };
        return service;


        function post(path, object) {
            return $resource(config.API_URL + path).save(object);
        }

        function query(path) {
            return $resource(config.API_URL + path).query();
        }

        function get(path, id) {
            return $resource(config.API_URL + path + '/:id', {id: id}).get();
        }

        function update(path, id, object) {
            return $resource(config.API_URL + path + '/:id', {id: id}).save(object);
        }

        function remove(path, id) {
            return $resource(config.API_URL + path + '/:id', {id: id}).remove();
        }
    }
})();
