(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(ProfileModel, $routeParams) {
            var vm = this;

            vm.model = ProfileModel.get({'id': 'current'});
            vm.skills = [];
            vm.words = [];
            vm.assignments = [];
            vm.certificates = [];

            activate();

            //////////////

            function activate() {
                ProfileModel.get({id: $routeParams.userId})
                    .$promise.then(function(value) {
                        vm.skills = value.user.skills;
                        vm.model = value;
                        vm.assignments = [{name: 'CVDB', skills:[{name: 'NodeJS'}, {name: 'Javascript'}, {name: 'Angular'}, {name: 'CSS'}]}, {name: 'SAIL', skills:[{name: 'Java'}, {name: 'Django'}, {name: 'Angular'}, {name: 'CSS'}]}]
                        vm.certificates = [{name: 'Master of Archery', date: "2012-07-02"}, {name: 'Bachelor of Cageness', date: '1995-11-13'}];
                        generateCloud();
                    });
            }

            function generateCloud() {
                vm.skills.forEach(function(skill) {
                    var word = {};
                    word.text = skill.name;
                    word.weight = Math.floor((Math.random()*4)+1);
                    vm.words.push(word);
                });
            }

            function refresh() {
                /* */
            }
        }
})();
