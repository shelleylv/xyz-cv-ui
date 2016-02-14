(function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('validatephonenumber', validatephonenumber);

    function validatephonenumber() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        //////////////

        function link (scope, elem, attr, ngModel) {
            var regex = /^[0-9+" "]{0,20}$/;
            ngModel.$parsers.unshift(function(value) {
                ngModel.$setValidity('validatephonenumber', regex.test(value));
                return value;
            });
        }
    }

})();