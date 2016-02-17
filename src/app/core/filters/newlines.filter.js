(function() {
    'use strict';

    angular
        .module('core.filters')
        .filter('newlines', newlines);

        function newlines() {
            return function(input) {
                if(input != null) {
                    return input.split(/\n/g);
                }
                else {
                    return null;
                }
            };
        }
})();
