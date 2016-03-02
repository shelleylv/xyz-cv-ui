(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('OthersModal', OthersModal);

    function OthersModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/others/others.view.html',
            controller: 'OthersController',
            controllerAs: 'vm'
        });
    }

})();
