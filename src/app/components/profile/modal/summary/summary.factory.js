(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .factory('SummaryModal', SummaryModal);

    function SummaryModal(btfModal) {
        return btfModal({
            templateUrl: '/xyz-cv-ui/components/profile/modal/summary/summary.view.html',
            controller: 'SummaryController',
            controllerAs: 'vm'
        });
    }

})();
