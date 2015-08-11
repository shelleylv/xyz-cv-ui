(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.people')
        .controller('PeopleController', PeopleController);

        function PeopleController(PeopleModel) {
            var vm = this;

            //////////////

            PeopleModel.get({id: ''})
                .$promise.then(function(model) {
                    vm.people = model.people;
                    vm.activated = true;
                    vm.office = model.office;
                    vm.itemUrl = '#/profile/';
                    vm.height = '' + window.innerHeight + 'px';
            });

        }
})();

