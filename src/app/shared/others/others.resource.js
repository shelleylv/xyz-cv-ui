(function() {
    'use strict';

    angular
        .module('shared.others')
        .factory('Others', Others);

    function Others(Resource) {
        return new Resource('/other/:_id', {_id: '@_id'});
    }

})();
