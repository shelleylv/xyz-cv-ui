(function() {
    'use strict';

    angular
        .module('model')
        .factory('OfficeModel', OfficeModel);

    function OfficeModel(Model) {
        return Model('/office/:_id', { '_id': '@_id' });
    }

})();
