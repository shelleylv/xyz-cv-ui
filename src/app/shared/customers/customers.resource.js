(function() {
    'use strict';

    angular
        .module('shared.customers')
        .factory('Customers', Customers);

    function Customers(Resource) {
        return new Resource('/customer/:_id', { _id: '@_id' });
    }

})();
