 (function() {
    'use strict';

    angular
        .module('model')
        .factory('Model', Model);

    function Model($resource, MODEL_URL) {

        return function(path, params, methods) {
            var defaults = {
                update: { method: 'put', isArray: false },
                create: { method: 'post' }
            };

            methods = angular.extend(defaults, methods);

            var model = $resource(MODEL_URL + path, params, methods);

            model.prototype.$save = function() {
                if(!this.id) {
                    return this.$create();
                }
                return this.$update();
            };

            return model;
        };
    }

 })();
