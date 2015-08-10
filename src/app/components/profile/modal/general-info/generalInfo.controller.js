(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('GeneralInfoController', GeneralInfoController);

        function GeneralInfoController(GeneralInfoModal, Users, Offices, UserToOffice, flagFilter, block, user, callback, $timeout, $q) {
            var vm = this;

            vm.offices = [];
            vm.countries = [];
            vm.user = {};
            vm.generalInfo = block;
            vm.hideModal = hideModal;
            vm.save = save;
            vm.active = false;

            activate();

            function activate() {

                var promises = {
                    offices: Offices.query().$promise,
                    user: Users.get({_id: user._id}).$promise,
                    connector: UserToOffice.query({userId: user._id}).$promise
                };

                $q.all(promises)
                    .then(function(values) {
                        vm.user = values.user;
                        vm.connector = values.connector;
                        setOffices(values.offices);
                        setConnector();
                        setCountries();
                        vm.active = true;
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

            function setOffices(offices) {
                offices.forEach(function(office) {
                    office.country = 'Sweden';
                    office.label = '<span class="flag-icon flag-icon-' + flagFilter(office.country) + '"></span> ' + office.name;
                    if (vm.generalInfo.office && office._id === vm.generalInfo.office._id) {
                        vm.generalInfo.office = office;
                    }
                });
                vm.offices = offices;
            }

            function setConnector() {
                vm.connector = vm.connector.length ? vm.connector[0] : null;
            }

            function hideModal() {
                vm.active = false;
                $timeout(function() {
                    GeneralInfoModal.deactivate();
                }, 150);
            }

            function save() {
                vm.generalInfo.personalInterests = vm.generalInfo.personalInterests.split(', ');

                vm.user = angular.extend(vm.user, vm.generalInfo);

                saveOffice(vm.user)
                    .then(function(user) {
                        vm.user = user;

                        delete vm.user.skills;
                        delete vm.user.assignments;
                        delete vm.user.role;
                        delete vm.user.profileImage;
                        delete vm.user.email;
                        delete vm.user.hidden;

                        vm.user.$save()
                            .then(vm.hideModal)
                            .then(callback);
                    });
            }

            function saveOffice(user) {
                return $q(function(resolve) {
                    if (user.office._id) {
                        if (!vm.connector) {
                            vm.connector = new UserToOffice({userId: user._id, officeId: user.office._id});
                        } else {
                            vm.connector.officeId = user.office._id;
                            vm.connector = new UserToOffice(vm.connector);
                        }
                        delete user.office
                        return vm.connector.$save().then(resolve(user))
                    }
                    delete user.office
                    return resolve(user);
                })
            }

            function refresh() {
                /* */
            }
        }
})();
