(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        //Profile.$inject = [];
        function ProfileController() {
            /* jshint validthis: true */
            var vm = this;

            vm.hello = [6, 7, 8, 9, 10];

            //////////////

            function refresh() {
                /* */
            }
        }
})();
