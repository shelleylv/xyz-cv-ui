(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.competence')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/competence/',
                config: {
                    templateUrl: '/xyz-cv-ui/components/competence/competence.html',
                    controller: 'CompetenceController',
                    controllerAs: 'vm',
                    title: 'competence'
                }
            }
        ];
    }
})(); 
