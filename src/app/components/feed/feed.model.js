(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.feed')
        .factory('FeedModel', FeedModel);

    function FeedModel(Model) {
        return new Model('/feed/');
    }

})();
