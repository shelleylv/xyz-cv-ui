(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('GeneralInfoController', GeneralInfoController);

        function GeneralInfoController(GeneralInfoModal, Users, Offices, block, user, callback, $timeout) {
            var vm = this;

            vm.offices = [];
            vm.countries = [];
            vm.user = {};
            vm.generalInfo = block;
            vm.hideModal = function() {
                vm.exists = false;
                $timeout(function() {
                    GeneralInfoModal.deactivate();
                }, 150);
            };
            vm.save = save;
            vm.exists = false;

            activate();

            function activate() {
                Users.get({_id: user._id}).$promise
                    .then(function(user) {
                        vm.user = user;
                        setCountries();
                        setOffices();
                        vm.exists = true;
                    })
            }

            function setCountries() {
                vm.countries = [
                    {value: 'Sweden', label: '<span class="flag-icon flag-icon-se"></span> Sweden'},
                    {value: 'Finland', label: '<span class="flag-icon flag-icon-fi"></span> Finland'},
                    {value: 'Denmark', label: '<span class="flag-icon flag-icon-dk"></span> Denmark'},
                    {value: 'Norway', label: '<span class="flag-icon flag-icon-no"></span> Norway'},
                    {value: 'Bosnia', label: '<span class="flag-icon flag-icon-ba"></span> Bosnia & Herzegovina'}
                ];
            }

            function setOffices() {
                //Offices.query();
                vm.offices = [
                    {value: 'Stockholm', label: '<span class="flag-icon flag-icon-se"></span> Stockholm'},
                    {value: 'Malmö', label: '<span class="flag-icon flag-icon-se"></span> Malmö'},
                    {value: 'Karlskrona', label: '<span class="flag-icon flag-icon-se"></span> Karlskrona'},
                    {value: 'Sarajevo', label: '<span class="flag-icon flag-icon-ba"></span> Sarajevo'}
                ];
            }

            function save() {
                vm.generalInfo.personalInterests = vm.generalInfo.personalInterests.split(', ');

                vm.user = angular.extend(vm.user, vm.generalInfo);

                delete vm.user.office;
                delete vm.user.skills;
                delete vm.user.assignments;
                delete vm.user.role;
                delete vm.user.profileImage;

                vm.user.$save()
                    .then(vm.hideModal)
                    .then(callback);
            }

            function refresh() {
                /* */
            }
        }
})();
