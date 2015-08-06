(function() {
    'use strict';

    angular
        .module('model')
        .factory('CompetenceModel', CompetenceModel);

    function CompetenceModel(Model) {
        return Model('/competence/:_id', { '_id': '@_id' });
    }

})();