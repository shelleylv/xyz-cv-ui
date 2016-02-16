(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('SummaryController', SummaryController);

        function SummaryController(SummaryModal, Users, block, user, callback, $timeout) {
            var vm = this;

            vm.user = {};
            vm.summary = block;
            vm.hideModal = hideModal;
            vm.save = save;
            vm.active = false;

            activate();

            //////////////

            function activate() {
                Users.get({ _id: user._id }).$promise
                    .then(function(user) {
                        vm.user = user;
                        vm.active = true;
                    });
            }

            function hideModal() {
                vm.active = false;
                $timeout(function() {
                    SummaryModal.deactivate();
                }, 150);
            }

            function save() {
                vm.user = angular.extend(vm.user, vm.summary);

                vm.user.$save()
                    .then(vm.hideModal)
                    .then(callback);
            }
        }
})();
