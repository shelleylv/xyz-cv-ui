 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Resource', Resource);

    function Resource($resource, API_URL) {

        return function(path, params, methods) {
            var defaults = {
                update: { method: 'PUT', isArray: false, withCredentials: true },
                create: { method: 'POST', withCredentials: true},
            };

            methods = angular.extend(defaults, methods);

            var resource = $resource(API_URL + path, params, methods);

            resource.prototype.$save = function() {
                if(!this._id) {
                    return this.$create();
                }

                return this.$update();
            };

            return resource;
        };
    }

 })();
