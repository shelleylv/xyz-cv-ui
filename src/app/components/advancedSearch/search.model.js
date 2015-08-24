(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.advancedSearch')
        .factory('SearchModel', SearchModel);

    function SearchModel(Model) {
        return Model('/search/:searchType');
    }

})();
