(function() {
    'use strict';

    angular.module('xyz-cv-ui.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource', 'angular-loading-bar',
        'ngRetina', 'mgcrea.ngStrap', 'btford.modal',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router', 'xyz-cv-ui.config',

        'resource', 'directives', 'model', 'blocks.session',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ngStorage', 'ngMessages'
    ]);
})();
