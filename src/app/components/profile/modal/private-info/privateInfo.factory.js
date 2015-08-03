(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('PrivateInfoModal', PrivateInfoModal);

    function PrivateInfoModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/private-info/privateInfo.view.html',
            controller: 'PrivateInfoController',
            controllerAs: 'vm'
        });
    }

})();
