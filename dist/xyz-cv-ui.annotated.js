(function() {
    'use strict';

    angular.module('xyz-cv-ui.profile', []);
})();

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
    appRun.$inject = ["routehelper"];

    function getRoutes() {
        return [
            {
                url: '/profile',
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

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(Skills) {
            var vm = this;

            vm.skills = Skills.query();

            //////////////

            function createSkill(skill) {
                skill.$save();
            }

            function deleteSkill(skill) {
                skill.$delete();
            }

            function refresh() {
                /* */
            }
        }
        ProfileController.$inject = ["Skills"];
})();

(function() {
    'use strict';

    angular.module('xyz-cv-ui.dashboard', []);
})();

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
    appRun.$inject = ["routehelper"];

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: '/xyz-cv-ui/components/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard'
                }
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController() {
        var vm = this;

        vm.newsArticles = [{
            title: 'Sydost hires 4 junior developers',
            teaser: 'Softhouse Sydost has hired four new \
                    junior developers following a summer project \
                    resulting in three successful in-house projects, \
                    one of which was awarded with the prestigious',
            date: 'Oct. 15, 2015'
        }, {
            title: 'Sail has been released',
            teaser: 'The crack team of prodigiously gifted \
                    developers in the Karlskrona office working \
                    on Sail have released the first stable version \
                    of their notorious application monitoring software.',
            date: 'Aug. 3, 2015'
        }];

        vm.newFaces = [{
            name: 'Gustav Pihl Bohlin',
            skills: ['C++', 'Python', 'HTML5', 'CSS', 'Angular'],
            office: 'Karlskrona'
        }, {
            name: 'Rasmus Letterkrantz',
            skills: ['Ruby', 'Angular', 'HTML5', 'Haskell', 'Hockey'],
            office: 'Karlskrona'
        }];

        //////////////

        function refresh() {
            /* */
        }
    }
})();

(function() {
    'use strict';

    angular.module('xyz-cv-ui.access', []);
})();

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.access')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
    appRun.$inject = ["routehelper"];

    function getRoutes() {
        return [
            {
                url: '/access',
                config: {
                    templateUrl: '/xyz-cv-ui/components/access/access.html',
                    controller: 'AccessController',
                    controllerAs: 'vm',
                    title: 'access'
                }
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.access')
        .controller('AccessController', AccessController);

        function AccessController(Accesses) {
            var vm = this;
            vm.accesses = Accesses.query();

            //////////////

            function refresh() {
                /* */
            }
        }
        AccessController.$inject = ["Accesses"];
})();

(function() {
    'use strict';

    angular.module('blocks.router', [
        'ngRoute',
        'blocks.logger'
    ]);
})();

(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, logger, routehelperConfig) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
    routehelper.$inject = ["$location", "$rootScope", "$route", "logger", "routehelperConfig"];
})();

(function() {
    'use strict';

    angular.module('blocks.logger', []);
})();


(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    function logger($log, toastr) {
        var service = {
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
    logger.$inject = ["$log", "toastr"];
}());

(function() {
    'use strict';

    angular.module('blocks.exception', ['blocks.logger']);
})();

(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
    exception.$inject = ["logger"];
})();

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    /**
     * Must configure the exception handling
     * @return {[type]}
     */
    function exceptionHandlerProvider() {
        /* jshint validthis:true */
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function() {
            return {config: this.config};
        };
    }

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     */
    function config($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
    config.$inject = ["$provide"];

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate, exceptionHandler, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
        };
    }
    extendExceptionHandler.$inject = ["$delegate", "exceptionHandler", "logger"];
})();

(function() {
    'use strict';

    angular.module('resource', []);
})();

 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Skills', Skills);

    function Skills(Resource) {
        return Resource('/skill/:id', { id: '@id' });
    }
    Skills.$inject = ["Resource"];

 })();

 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Resource', Resource);

    function Resource($resource, config) {

        return function(path, params, methods) {
            var defaults = {
                update: { method: 'put', isArray: false },
                create: { method: 'post' }
            };

            methods = angular.extend(defaults, methods);

            var resource = $resource(config.API_URL + path, params, methods);

            resource.prototype.$save = function() {
                if(!this.id) {
                    return this.$create();
                }
                return this.$update();
            };

            return resource;
        };
    }
    Resource.$inject = ["$resource", "config"];

 })();

 (function() {
    'use strict';

    angular
        .module('resource')
        .factory('Accesses', Accesses);

    function Accesses(Resource) {
        return Resource('/roleToAttributeConnector/');
    }
    Accesses.$inject = ["Resource"];

 })();

(function() {
    'use strict';

    angular.module('xyz-cv-ui.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',

        'resource',
        /*
         * 3rd Party modules
         */
        'ngplus'
    ]);
})();

/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();

(function() {
    'use strict';

    var core = angular.module('xyz-cv-ui.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    toastrConfig.$inject = ["toastr"];

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
        appTitle: 'CV',
        version: '1.0.0',

        API_URL: 'http://xyz.softhouse.se/cv-api'
    };

    core.value('config', config);

    core.config(configure);

    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
    configure.$inject = ["$logProvider", "$routeProvider", "routehelperConfigProvider", "exceptionHandlerProvider"];
})();

(function() {
    'use strict';

    angular.module('xyz-cv-ui', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'xyz-cv-ui.core',
        //'app.widgets',

        /*
         * Feature areas
         */
        'xyz-cv-ui.dashboard',
        'xyz-cv-ui.profile',
        'xyz-cv-ui.access'
    ]);

})();

(function(module) {
try {
  module = angular.module('xyz-cv-ui');
} catch (e) {
  module = angular.module('xyz-cv-ui', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/xyz-cv-ui/components/access/access.html',
    '<div class="panel panel-default"><div class="panel-body"><br><ul><li ng-repeat="access in vm.accesses">{{ access }}</li></ul></div><div class="panel-footer">Accesses</div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('xyz-cv-ui');
} catch (e) {
  module = angular.module('xyz-cv-ui', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/xyz-cv-ui/components/dashboard/dashboard.html',
    '<div class="row"><div class="col-md-4"><div class="panel panel-default"><div class="news-article" ng-repeat="article in vm.newsArticles"><div class="titlebar"><div class="title">{{article.title}}</div><div class="date pull-right">{{article.date}}</div></div><div class="teaser">{{article.teaser}} ...</div></div><div class="panel-footer">News</div></div></div><div class="col-md-4"><div class="panel panel-default"><div class="facecard" ng-repeat="face in vm.newFaces"><img src="assets/rasmusletterkrantz106.jpg"> {{face.name}}<div class="skilltag" ng-repeat="skill in face.skills">{{skill}}</div></div><div class="panel-footer">New faces</div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('xyz-cv-ui');
} catch (e) {
  module = angular.module('xyz-cv-ui', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/xyz-cv-ui/components/profile/profile.html',
    '<div class="jumbotron">HERE IS YOUR PROFILE</div><ul><li ng-repeat="skill in vm.skills">{{ skill.name }}</li></ul>');
}]);
})();
