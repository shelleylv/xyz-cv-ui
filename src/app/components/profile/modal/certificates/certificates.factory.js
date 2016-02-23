(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('CertificatesModal', CertificatesModal);

    function CertificatesModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/certificates/certificates.view.html',
            controller: 'CertificatesController',
            controllerAs: 'vm'
        });
    }

})();
