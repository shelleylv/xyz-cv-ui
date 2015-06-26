(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(Skills) {
            var vm = this;

            vm.skills = Skills.query();

            //////////////

            function createSkill(skill) {
                skill.$save();
            }

            function deleteSkill(skill) {
                skill.$delete();
            }

            function refresh() {
                /* */
            }
        }
})();
