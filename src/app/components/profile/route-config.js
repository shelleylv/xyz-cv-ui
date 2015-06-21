(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/profile',
                config: {
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'profile',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-user"></i> Profile'
                    }
                }
            }
        ];
    }
})();
