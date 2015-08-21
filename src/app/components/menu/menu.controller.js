(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.menu')
        .controller('MenuController', MenuController);

        function MenuController(OfficesService, Users, Files, API_URL, $q) {
            var vm = this;
            vm.API_URL = API_URL;

            vm.toggled = false;

            vm.user = {};
            vm.offices = [];
            vm.panels = [];
            vm.panels.activePanel = [];

            activate();

            //////////////

            function activate() {
                var promises = {
                    user: Users.get({ _id: 'current' }).$promise,
                    offices: OfficesService.get()
                };

                $q.all(promises)
                    .then(function(values) {
                        vm.user = values.user;
                        vm.offices = values.offices;
                        setProfileImage()
                            .then(function() {
                                setPanels();
                            });
                    });
            }

            function setPanels() {
                vm.panels = [];
                vm.panels.push(getOfficesPanels());
            }

            function getOfficesPanels() {
                return {
                    title: 'Offices',
                    icon: 'fa-building-o',
                    itemIcon: 'fa-building',
                    itemUrl: '#/office/',
                    items: vm.offices
                };
            }

            function setProfileImage() {
                return $q(function(resolve) {
                    if (vm.user.profileImage) {
                        Files.get({_id: vm.user.profileImage }).$promise
                            .then(function(file) {
                                vm.user.profileImage = file;
                                return resolve();
                            });
                    } else {
                        return resolve();
                    }
                });
            }

        }

})();
