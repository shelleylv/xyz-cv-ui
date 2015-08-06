(function() {
    'use strict';

    angular
        .module('shared.flags')
        .filter('country', function() {
            return function(officeName) {
                if(!officeName) {
                    console.log('no office name');
                    return 'bolivia';
                }
                var countries = [{
                    name: 'bosnia',
                    offices: ['sarajevo']
                },
                {
                    name: 'sweden',
                    offices: ['karlskrona', 'malmö', 'stockholm']
                }];


                var countryMatch = _.find(countries, function(country) {
                    var match = country.offices.some(function(office) {
                        return office.toLowerCase().indexOf(officeName.toLowerCase() > -1);
                    });
                    return match;
                });

                if(countryMatch) {
                    return countryMatch.name;
                } else {
                    return 'bolivia';
                }
            };
        });

})();
