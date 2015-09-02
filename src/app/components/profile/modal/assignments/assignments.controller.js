(function () {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('AssignmentsController', AssignmentsController);

    function AssignmentsController(AssignmentsModal, Users, block, user, callback) {
        var vm = this;
        window.vm2 = vm;

        vm.user = {};
        vm.assignments = block;
        vm.hideModal = AssignmentsModal.deactivate;
        vm.save = save;

        vm.skillSuggestions = {
            data: ['Excelling', 'Being best', 'Winning']
        };

        vm.loadTags = function (query, suggestions) {
            return _.filter(suggestions.data, function (str) {
                if (str)
                    return (str.toLowerCase().indexOf(query.toLowerCase()) > -1);
                else
                    return false;
            });
        }

        activate();

        function activate() {
            Users.get({_id: user._id}).$promise
                .then(function (user) {
                    vm.user = user;
                });
        }

        function save() {

            vm.user.$save()
                .then(vm.hideModal)
                .then(callback);
        }

    }
})();
