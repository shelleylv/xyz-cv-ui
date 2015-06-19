(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('Profile', Profile);

        //Profile.$inject = [];
        function Profile() {
            /* jshint validthis: true */
            var vm = this;

            vm.hello = [6, 7, 8, 9, 10];

            //////////////

            function refresh() {
                /* */
            }
        }
})();
