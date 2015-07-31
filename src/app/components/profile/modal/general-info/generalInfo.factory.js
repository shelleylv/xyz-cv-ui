(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('GeneralInfoModal', GeneralInfoModal);

    function GeneralInfoModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/general-info/generalInfo.view.html',
            controller: 'GeneralInfoController',
            controllerAs: 'vm'
        });
    }

})();
