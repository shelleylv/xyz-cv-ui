(function() {
    'use strict';

    angular.module('xyz-cv-ui.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource',
        /*
         * Our core cross app code modules
         */
        'core.exception', 'core.logger', 'core.router',

        'core.directives', 'core.session',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ngStorage', 'ngMessages', 'angular-loading-bar',
        'ngRetina', 'mgcrea.ngStrap', 'btford.modal', 'angularFileUpload',
        'ngImgCrop'
    ]);
})();
