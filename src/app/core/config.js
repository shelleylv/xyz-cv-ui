(function() {
    'use strict';

    var core = angular.module('xyz-cv-ui.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
        appTitle: 'CV',
        version: '1.0.0',
    };

    core.value('config', config);

    core.config(configure);

    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider, $httpProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);

        // Configure $httpProvider to allow CORS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
})();
