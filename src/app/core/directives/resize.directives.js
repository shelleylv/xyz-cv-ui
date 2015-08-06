(function() {
	'use strict';

	angular
		.module('core.directives')
		.directive('resize', resize);

	function resize($window, $timeout, $rootScope) {
		var directive = {
			link: link
		};
		return directive;

		function link () {
			var broadcastTimer;

			function broadcast() {
				if (broadcastTimer) {
					$timeout.cancel(broadcastTimer);
				}
				broadcastTimer = $timeout(doBroadcast, 300);
			}

			function doBroadcast() {
				$rootScope.$broadcast('sail-resize');
				broadcastTimer = undefined;
			}

			angular.element($window).on('resize', broadcast);
		}
	}
})();
