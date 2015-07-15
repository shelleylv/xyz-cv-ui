(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/profile/:userId',
                config: {
                    templateUrl: '/xyz-cv-ui/components/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'profile'
                }
            }
        ];
    }
})();
