(function() {
    'use strict';

    angular.module('xyz-cv-ui.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource', 'angular-loading-bar',
        'ngRetina',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router', 'xyz-cv-ui.config',

        'resource', 'directives', 'model',
        /*
         * 3rd Party modules
         */
        'ngplus'
    ]);
})();
