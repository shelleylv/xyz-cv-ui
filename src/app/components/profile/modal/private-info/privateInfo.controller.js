(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('PrivateInfoController', PrivateInfoController);

        function PrivateInfoController(PrivateInfoModal, Users, Offices, block, user, callback, $timeout) {
            var vm = this;

            vm.offices = [];
            vm.countries = [];
            vm.user = {};
            vm.active = false;

            vm.privateInfo = {
                personalIdNumber: '',
                address: '',
                city: '',
                ZIP: '',
                ICEName: '',
                ICEPhone: '',
                startDateOfEmployment: '',
                endDateOfEmployment: '',
                shirtSize: '',
                foodPreferences: '',
                addressInfo: '',
                ICEInfo: ''
            };

            vm.hideModal = hideModal;
            vm.save = save;

            activate();

            //////////////

            function activate() {
                Users.get(user).$promise
                    .then(function(user) {
                        vm.privateInfo = block;
                        vm.user = user;
                        vm.active = true;
                    });
            }

            function hideModal() {
                vm.active = false;
                $timeout(function() {
                    PrivateInfoModal.deactivate();
                }, 150);
            }

            function save() {
                vm.user = angular.extend(vm.user, vm.privateInfo);

                vm.user.$save()
                    .then(vm.hideModal)
                    .then(callback);
            }
        }
})();
