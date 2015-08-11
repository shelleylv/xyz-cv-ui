(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('AssignmentsModal', AssignmentsModal);

    function AssignmentsModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/assignments/assignments.view.html',
            controller: 'AssignmentsController',
            controllerAs: 'vm'
        });
    }

})();
