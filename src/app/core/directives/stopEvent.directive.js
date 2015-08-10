   (function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('stopEvent', stopEvent);

        function stopEvent() {
            var directive = {
                restrict: 'A',
                link: link

            }
            return directive;

            function link(scope, element, attr) {
                if(attr && attr.stopEvent) {
                    element.bind(attr.stopEvent, function (e) {
                        e.stopPropagation();
                    });
                }
            }

        }
})();

