(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.feed')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/feed',
                config: {
                    templateUrl: '/xyz-cv-ui/components/feed/feed.html',
                    controller: 'FeedController',
                    controllerAs: 'vm',
                    title: 'feed'
                }
            }
        ];
    }
})();
