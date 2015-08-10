(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('SkillsModal', SkillsModal);

    function SkillsModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/skills/skills.view.html',
            controller: 'SkillsController',
            controllerAs: 'vm'
        });
    }

})();
