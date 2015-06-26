(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(Skill) {
            var vm = this;

            vm.hello = [6, 7, 8, 9, 10];
            vm.skills = [];

            getSkills();

            //////////////

            function getSkills() {
                vm.skills = Skill.query();
            }

            function createSkill() {
                var skill = {
                    name: 'testSkill'
                };
                Skill.save(skill);
            }

            function deleteSkill() {
                Skill.remove({id: '558bed98ed289d0f00d2c602'});
            }

            function refresh() {
                /* */
            }
        }
})();
