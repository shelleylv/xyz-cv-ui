(function() {
    'use strict';

    angular
        .module('shared.offices')
        .factory('OfficesService', OfficesService);

    function OfficesService(Offices, $q) {
        var offices = [];

        var service = {
            get: get
        };

        return service;

        /////////////////

        function get() {
            return $q(function(resolve) {
                if (offices.length) {
                    return resolve(offices);
                } else {
                    Offices.query().$promise
                        .then(function(res) {
                            offices = res;
                            return resolve(offices);
                        });
                }
            });
        }
    }

})();
