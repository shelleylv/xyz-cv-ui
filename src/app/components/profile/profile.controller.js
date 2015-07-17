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

            activate();

            //////////////

            function activate() {
                ProfileModel.get({id: $routeParams.userId})
                    .$promise.then(function(value) {
                        vm.skills = value.user.skills;
                        vm.model = value;
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
