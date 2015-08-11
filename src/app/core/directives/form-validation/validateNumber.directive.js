(function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('validatenumber', validatenumber);

    function validatenumber() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        //////////////

        function link (scope, elem, attr, ngModel) {
            var regex = /^[0-9]{1,20}$/;
            ngModel.$parsers.unshift(function(value) {
                ngModel.$setValidity('validatenumber', regex.test(value));
                return value;
            });
        }
    }

})();
