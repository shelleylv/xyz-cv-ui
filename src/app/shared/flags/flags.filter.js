(function() {
    angular
        .module('shared.flags')
        .filter('flag', function() {
            return function(countryName) {
                if(!countryName) {
                    console.log('no country name');
                    return 'se';
                }
                var countries = [{
                    name: 'bosnia',
                    flag: 'ba'
                },
                {
                    name: 'denmark',
                    flag: 'dk'
                },
                {
                    name: 'sweden',
                    flag: 'se'
                },
                {
                    name: 'bolivia',
                    flag: 'bo'
                }];

                var country = _.find(countries, function(country) {
                    return country.name.toLowerCase().indexOf(countryName.toLowerCase()) > -1;
                });

                if(country) {
                    return country.flag;
                } else {
                    return 'se';
                }
            };
        });

})();

