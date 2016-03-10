(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.access')
        .controller('AccessController', AccessController);

        function AccessController(Accesses) {
            var vm = this;
            vm.accesses = Accesses.query();
        }
})();
