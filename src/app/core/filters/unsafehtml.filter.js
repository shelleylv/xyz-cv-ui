(function() {
    'use strict';

    angular
        .module('core.filters')
        .filter('unsafehtml', unsafehtml);

        function unsafehtml($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        }
})();
