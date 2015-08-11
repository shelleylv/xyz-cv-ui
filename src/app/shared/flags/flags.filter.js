(function() {
    'use strict';

    angular
        .module('shared.flags')
        .filter('flag', flag);

        function flag(CountriesService) {
            var alpha2CodesHash = CountriesService.getAlpha2CodesHash();
            return function(countryName) {
                if(!countryName) {
                    return 'se';
                }

                return alpha2CodesHash[countryName.toLowerCase()] || 'se';
            };
        }

})();

