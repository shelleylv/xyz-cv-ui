(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('LanguagesModal', LanguagesModal);

    function LanguagesModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/languages/languages.view.html',
            controller: 'LanguagesController',
            controllerAs: 'vm'
        });
    }

})();
