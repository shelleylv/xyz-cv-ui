(function () {
    'use strict';

    angular
        .module('core.directives')
        .directive('swipeAction', swipeAction);

    function swipeAction($swipe, $timeout) {
        var directive = {
            transclude: true,
            template: '<div class="item-swipe-wrapper" style="position: relative">' +
            '<div class="swipe-overlay-left" ng-click="onRemove(item)"><i class="fa fa-trash"></i> Delete</div>' +
            '<div class="swiper" ng-style="swiperStyle" ng-transclude style="position: relative"></div>' +
            '<div class="swipe-overlay-right" ng-click="onEdit(item)"><i class="fa fa-edit"></i> Edit</div>' +
            '</div>',
            link: link,
            scope: {
                onRemove: '=onRemove',
                onEdit: '=onEdit',
                item: '=item'
            }
        };
        return directive;

        //////////////

        function link(scope, element, attr) {
            // For touch devices
            var startCoords = {
                x: 0,
                y: 0
            };

            var point = {
                x: 0,
                y: 0
            };
            var timer;

            var width = element[0].offsetWidth;
            var swiper = element[0].querySelector('.swiper');
            var leftOverlay = element[0].querySelector('.swipe-overlay-left');
            var rightOverlay = element[0].querySelector('.swipe-overlay-right');

            var setCompletion = function (ratio) {
                var style = swiper.style;
                var overlayStyle = leftOverlay.style;
                style.left = ratio * 100 + '%';

                if(ratio > 0) {
                    overlayStyle.width = ratio * 100 + '%';
                    overlayStyle.color = 'rgba(255, 255, 255,' + ratio*2 + ')';
                    rightOverlay.style.width = 0;
                    rightOverlay.style.color = 'rgba(255, 255, 255,' + 0 + ')';
                }

                if (ratio <= 0) {
                    rightOverlay.style.width = (-ratio) * 100 + '%';
                    rightOverlay.style.color = 'rgba(255, 255, 255,' + (-ratio*2) + ')';
                    leftOverlay.style.width = 0;
                    leftOverlay.style.color = 'rgba(255, 255, 255,' + 0 + ')';
                }
            };

            var reset = function () {
                swiper.style.left = 0;
                leftOverlay.style.width = 0;
                rightOverlay.style.width = 0;
            };

            var transition = function () {
                swiper.classList.add('onion');
                leftOverlay.classList.add('onion');
                rightOverlay.classList.add('onion');
                timer = $timeout(function () {
                    swiper.classList.remove('onion');
                    leftOverlay.classList.remove('onion');
                    rightOverlay.classList.remove('onion');
                }, 200);
            }

            function fullSwipeRight(coords) {
                return coords.x - startCoords.x > width * 0.50 ? true : false;
            }

            function halfSwipeRight(coords) {
                return coords.x - startCoords.x > width * 0.25 ? true : false;
            }

            function halfSwipeLeft(coords) {
                return coords.x - startCoords.x < -width * 0.25 ? true : false;
            }

            $swipe.bind(element, {
                'start': function (coords) {
                    startCoords = coords;
                    element[0].querySelector('.swipe-overlay-left').classList.remove('onion');
                    if (timer) {
                        timer.cancel();
                    }
                    setCompletion(0);
                },
                'move': function (coords) {
                    var delta = {
                        x: coords.x - point.x,
                        y: coords.y - point.y
                    };

                    if (fullSwipeRight(coords)) {
                        setCompletion(1);
                        transition();
                    } else if (halfSwipeRight(coords)) {
                        setCompletion(0.5);
                        transition();
                    } else if (halfSwipeLeft(coords)) {
                        setCompletion(-0.5);
                        transition();
                    } else {
                        setCompletion((coords.x - startCoords.x) / width);
                    }
                },
                'end': function (coords) {
                    if (fullSwipeRight(coords)) {
                        $timeout(function(){
                            scope.onRemove(scope.item);
                        }, 500);
                    } else if(halfSwipeRight(coords)) {

                    } else if(halfSwipeLeft(coords)) {

                    } else {
                        reset();
                        transition();
                    }
                },
                'cancel': function (coords) {
                    setCompletion(0);
                    transition();
                }
            });
            /*
             element.bind("touchstart", function(coord, evt) {
             scope.$apply(function(thing) {
             console.log(evt);
             console.log(coord);
             });
             });

             element.bind("touchend", function() {
             scope.$apply(function(evt) {
             console.log("swipe action ended");
             });
             });

             element.bind("touchmove", function() {
             scope.$apply(function(evt) {

             scope.$parent.currentLetter = element.text();
             });
             });

             // For desktops
             element.bind("mousemove", function(evt, e2) {
             scope.$apply(function() {
             console.log(evt);
             console.log(e2);

             scope.$parent.currentLetter = element.text();
             });
             });*/
        }
    }
})();
