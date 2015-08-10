(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('ImageModal', ImageModal);

    function ImageModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/image/image.view.html',
            controller: 'ImageController',
            controllerAs: 'vm'
        });
    }

})();
