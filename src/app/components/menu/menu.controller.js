(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.menu')
        .controller('MenuController', MenuController);

        function MenuController(OfficesService) {
            var vm = this;

            vm.toggled = false;

            vm.offices = [];
            vm.panels = [];
            vm.panels.activePanel = [];

            activate();

            //////////////

            function activate() {
                OfficesService.get().then(function(offices){
                    vm.offices = offices;
                    setPanels();
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

        }

})();
