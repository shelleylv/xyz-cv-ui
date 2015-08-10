(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.office')
        .factory('OfficeModel', OfficeModel);

    function OfficeModel(Model) {
        return Model('/office/:_id', { '_id': '@_id' });
    }

})();
