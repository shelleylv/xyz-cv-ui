(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.access')
        .controller('AccessController', AccessController);

        function AccessController(Access) {
            var vm = this;

            vm.hello = [10, 20, 30, 40, 50];

            getAccesses();

            //////////////
            function getAccesses() {
                vm.hello = Access.query();
            }

            function refresh() {
                /* */
            }
        }
})();
