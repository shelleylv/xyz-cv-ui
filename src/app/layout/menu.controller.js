(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.menu')
        .controller('MenuController', MenuController);

        function MenuController(Accesses) {
            var vm = this;

            vm.toggled = false;

            vm.offices = [{
                name: 'Karlskrona'
            },{
                name: 'Malmö'
            }];

            vm.panels = [{
                title: 'Offices',
                icon: 'fa-building-o',
                itemIcon: 'fa-building',
                items: vm.offices
            }];

            vm.panels.activePanel = [];

            //////////////

            function refresh() {
                /* */
            }
        }
})();