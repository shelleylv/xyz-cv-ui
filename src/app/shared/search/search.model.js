(function() {
    'use strict';

    angular
        .module('shared.search')
        .factory('Search', Search);

    function Search(Model) {
        return new Model('/search/:searchType');
    }

})();
