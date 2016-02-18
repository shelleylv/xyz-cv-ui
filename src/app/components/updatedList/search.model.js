(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.updatedList')
        .factory('SearchModel', SearchModel);

    function SearchModel(Model) {
        return new Model('/search/:searchType');
    }

})();
