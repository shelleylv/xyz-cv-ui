(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.access')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'components/access/access.html',
                    controller: 'AccessController',
                    controllerAs: 'vm',
                    title: 'access',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-access"></i> Access'
                    }
                }
            }
        ];
    }
})();
