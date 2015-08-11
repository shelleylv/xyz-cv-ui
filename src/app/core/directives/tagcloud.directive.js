/*!
 * Angular jQCloud
 * For jQCloud 2 (https://github.com/mistic100/jQCloud)
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function() {
    'use strict';

    angular
        .module('core.directives')
        .directive('tagcloud', tagcloud);

    function tagcloud($parse) {

        var jqcOptions = [];

        var directive = {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            scope: {
                words: '=words'
            },
            link: generateLink
        };

        setJQCOptions();

        return directive;

        ///////////////

        function setJQCOptions() {
            var defaults = jQuery.fn.jQCloud.defaults.get();
            for (var opt in defaults) {
                if (defaults.hasOwnProperty(opt)) {
                    jqcOptions.push(opt);
                }
            }
        }

        function generateLink($scope, $elem, $attr) {
            var options = {};

            for (var i = 0, l = jqcOptions.length; i < l; i++) {
                var opt = jqcOptions[i];
                if ($attr[opt] !== undefined) {
                    options[opt] = $parse($attr[opt])();
                }
            }

            options.autoResize = true;

            $elem = $($elem).jQCloud($scope.words, options);

            $scope.$watchCollection('words', function() {
                $scope.$evalAsync(function() {
                    var words = [];
                    $.extend(words,$scope.words);
                    $elem.jQCloud('update', words);
                });
            });

            $elem.bind('$destroy', function() {
                $elem.jQCloud('destroy');
            });
        }
    }

})();


