(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.people')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/people/',
                config: {
                    templateUrl: '/xyz-cv-ui/components/people/people.html',
                    controller: 'PeopleController',
                    controllerAs: 'vm',
                    title: 'people'
                }
            }
        ];
    }
})();