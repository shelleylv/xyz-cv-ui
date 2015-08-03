(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('PrivateInfoController', PrivateInfoController);

        function PrivateInfoController(PrivateInfoModal, Users, Offices, block, user, callback) {
            var vm = this;

            vm.offices = [];
            vm.countries = [];
            vm.user = {};
            vm.privateInfo = block;
            vm.hideModal = PrivateInfoModal.deactivate;
            vm.save = save;

            activate();

            function activate() {
                Users.get(user).$promise
                    .then(function(user) {
                        vm.user = user;
                        setCountries();
                        setOffices();
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
                vm.user = angular.extend(vm.user, vm.privateInfo);

                vm.user.$save()
                    .then(vm.hideModal)
                    .then(callback);
            }

            function refresh() {
                /* */
            }
        }
})();
