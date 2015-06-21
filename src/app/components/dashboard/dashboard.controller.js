(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('DashboardController', DashboardController);

        //Dashboard.$inject = [];

        function DashboardController() {
            /* jshint validthis: true */
            var vm = this;

            vm.hello = [1, 2, 3, 4, 5];

            //////////////

            function refresh() {
                /* */
            }
        }
})();
