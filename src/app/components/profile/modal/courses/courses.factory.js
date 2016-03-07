(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('CoursesModal', CoursesModal);

    function CoursesModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/courses/courses.view.html',
            controller: 'CoursesController',
            controllerAs: 'vm'
        });
    }

})();
