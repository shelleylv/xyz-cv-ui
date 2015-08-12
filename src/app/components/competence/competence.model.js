(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.competence')
        .factory('CompetenceModel', CompetenceModel);

    function CompetenceModel(Model) {
        return new Model('/competence/:_id', { '_id': '@_id' });
    }

})();
