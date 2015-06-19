(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('Dashboard', Dashboard);

        //Dashboard.$inject = [];

        function Dashboard() {
            /* jshint validthis: true */
            var vm = this;

            vm.hello = [1, 2, 3, 4, 5];

            //////////////

            function refresh() {
                /* */
            }
        }
})();
