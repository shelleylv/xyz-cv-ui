(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('SkillsController', SkillsController);

        function SkillsController(SkillsModal, Users, Offices, block, user, callback) {
            var vm = this;
            window.vm2 = vm;

            vm.user = {};
            vm.skills = block;
            vm.hideModal = SkillsModal.deactivate;
            vm.save = save;

            vm.levels = [
            {
                value: 1,
                label: '1'
            },
            {
                value: 2,
                label: '2'
            },
            {
                value: 3,
                label: '3'
            },
            {
                value: 4,
                label: '4'
            },
            {
                value: 5,
                label: '5'
            }];

            activate();

            function activate() {
                Users.get(user).$promise
                    .then(function(user) {
                        vm.user = user;
                    })
            }

            function save() {
                //vm.user = angular.extend(vm.user, vm.skills);

                vm.user.$save()
                    .then(vm.hideModal)
                    .then(callback);
            }

            function refresh() {
                /* */
            }
        }
})();
