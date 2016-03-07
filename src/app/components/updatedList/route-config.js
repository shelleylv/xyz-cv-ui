(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.updatedList')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/updatedList',
                config: {
                    templateUrl: '/xyz-cv-ui/components/updatedList/updatedList.html',
                    controller: 'UpdatedListController',
                    controllerAs: 'vm',
                    title: 'updatedList'
                }
            }
        ];
    }
})();
