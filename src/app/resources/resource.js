 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Resource', Resource);

    function Resource($resource, config) {

        return function(path, params, methods) {
            var defaults = {
                update: { method: 'put', isArray: false },
                create: { method: 'post' }
            };

            methods = angular.extend(defaults, methods);

            var resource = $resource(config.API_URL + path, params, methods);

            resource.prototype.$save = function() {
                if(!this.id) {
                    return this.$create();
                }
                return this.$update();
            };

            return resource;
        };
    }

 })();
