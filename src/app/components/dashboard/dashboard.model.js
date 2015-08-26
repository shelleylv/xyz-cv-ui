(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .factory('DashboardModel', DashboardModel);

    function DashboardModel(Model) {
        return new Model('/dashboard/');
    }

})();
