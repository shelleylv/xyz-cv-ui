(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.menu')
        .controller('MenuController', MenuController);

        function MenuController(Accesses, Offices, ProfileModel, PeopleModel) {
            var vm = this;

            vm.toggled = false;

            vm.offices= Offices.query();

            PeopleModel.get({id: ''})
                .$promise.then(function(model) {
                    vm.people = model.user;

                vm.panels = [{
                    title: 'Offices',
                    icon: 'fa-building-o',
                    itemIcon: 'fa-building',
                    itemUrl: '#/office/',
                    items: vm.offices
                }];

                vm.panels.activePanel = [];
            });

            //////////////

            function refresh() {
                /* */
            }
        }
})();
