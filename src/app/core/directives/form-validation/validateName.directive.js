(function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('validatename', validatename);

    function validatename() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        //////////////

        function link (scope, elem, attr, ngModel) {
            var regex = /^[A-Z åäöÅÄÖ]{1,50}$/i;
            ngModel.$parsers.unshift(function(value) {
                ngModel.$setValidity('validatename', regex.test(value));
                return value;
            });
        }
    }

})();
