(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/dashboard/',
                config: {
                    templateUrl: '/xyz-cv-ui/components/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard'
                }
            }
        ];
    }
})();
