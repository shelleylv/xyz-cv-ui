(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.office')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/office/:officeId',
                config: {
                    templateUrl: '/xyz-cv-ui/components/office/office.html',
                    controller: 'OfficeController',
                    controllerAs: 'vm',
                    title: 'office'
                }
            }
        ];
    }
})();
