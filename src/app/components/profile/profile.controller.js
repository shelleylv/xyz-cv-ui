(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(ProfileModel, $routeParams) {
            var vm = this;

            vm.model = ProfileModel.get({'id': 'current'});
            vm.skills = [];

            activate();

            //////////////

            function activate() {
                ProfileModel.get({id: $routeParams.userId})
                    .$promise.then(function(value) {
                        vm.skills = value.user.skills;
                        vm.model = value;
                    });
            }

            function refresh() {
                /* */
            }
        }
})();
