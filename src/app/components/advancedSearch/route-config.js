(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.advancedSearch')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/advancedSearch',
                config: {
                    templateUrl: '/xyz-cv-ui/components/advancedSearch/advancedSearch.html',
                    controller: 'AdvancedSearchController',
                    controllerAs: 'vm',
                    title: 'search'
                }
            }
        ];
    }
})();
