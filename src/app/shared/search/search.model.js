(function() {
    'use strict';

    angular
        .module('shared.search')
        .factory('SearchModel', SearchModel);

    function SearchModel(Model) {
        return new Model('/search/:searchType');
    }
    
})();
