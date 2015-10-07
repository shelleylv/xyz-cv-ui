(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.export')
        .factory('ExportModel', ExportModel);

    function ExportModel(Model) {
        return new Model('/export/');
    }

})();
