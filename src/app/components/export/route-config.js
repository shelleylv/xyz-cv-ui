(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.export')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/export/',
                config: {
                    templateUrl: '/xyz-cv-ui/components/export/export.html',
                    controller: 'ExportController',
                    controllerAs: 'vm',
                    title: 'export'
                }
            }
        ];
    }
})();
