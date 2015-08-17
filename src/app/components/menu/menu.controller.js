(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.menu')
        .controller('MenuController', MenuController);

        function MenuController(OfficesService, UsersService, Files, API_URL, $q, session) {
            var vm = this;
            vm.API_URL = API_URL;
            window.vm5 = vm;

            vm.toggled = false;

            vm.user = {};
            vm.offices = [];
            vm.panels = [];
            vm.panels.activePanel = [];

            vm.isAllowed = session.isAllowed;

            session.isLoaded()
                .then(activate);

            //////////////

            function activate() {
                var promises = {
                    user: UsersService.getCurrent(),
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
