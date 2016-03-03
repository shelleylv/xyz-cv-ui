(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.updatedList')
        .controller('UpdatedListController', UpdatedListController);

    function UpdatedListController(SearchModel, API_URL, $q, Offices) {
            var vm = this;

            vm.API_URL = API_URL;
            vm.baseUrl = '#/profile/';
            vm.result = [];

            vm.suggestedOffices = [];
            vm.refinedOffices = [];
            vm.refinedIsShown = false;
            vm.doAdvancedSearch = doAdvancedSearch;
            vm.activated = false;
            vm.displayMode = 'table';
            
            activate();

            function activate() {
                SearchModel.get()
                    .$promise.then(function() {
                        doEmptySearch();
                        vm.activated = true;
                    });

                Offices.query().$promise
                    .then(function(offices) {
                        vm.suggestedOffices = offices;
                    });
            }

            function doEmptySearch() {
                return SearchModel.query({searchType: 'advancedSearch/','parameters': {refinedOffices: []}})
                    .$promise.then(function(value) {
                        vm.result = value;
                        return value;
                    });
            }

            function doAdvancedSearch() {
                var urlObject = {refinedOffices: vm.refinedOffices};
                SearchModel.query({searchType: 'advancedSearch/','parameters': urlObject}).$promise
                    .then(function(value) {
                        vm.result = value;
                        return value;
                    });
            }
        }
})();