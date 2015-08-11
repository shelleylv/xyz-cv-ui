(function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('validatewords', validatewords);

    function validatewords() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        //////////////

        function link (scope, elem, attr, ngModel) {
            var regex = /^[A-Z åäöÅÄÖ]{1,100}$/i;
            ngModel.$parsers.unshift(function(value) {
                ngModel.$setValidity('validatewords', regex.test(value));
                return value;
            });
        }
    }

})();
