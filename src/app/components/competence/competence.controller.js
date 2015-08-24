(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.competence')
        .controller('CompetenceController', CompetenceController);

        function CompetenceController(CompetenceModel) {
            var vm = this;
            window.vm9 = vm;

             CompetenceModel.get()
                .$promise.then(function(model) {
                    vm.competence = model.competence;
                    vm.offices = model.offices;
                    vm.skills = model.skills;
                    vm.skill = [];
                    vm.office = [];
                    vm.getUserNamesInSelectedOfficesCSV = getUserNamesInSelectedOfficesCSV;
                    vm.getUserSkillCSV = getUserSkillCSV;
                    vm.setCompetenceData = setCompetenceData;
                    vm.competenceData = [];
                    defaultSkillsToValue(true)
                    vm.activated = true;
            });

            //////////////

            function setCompetenceData() {
                var resultArr = [];
                vm.competence.map(function(competence) {
                    if (vm.skill[competence.skill]) {
                    var users = [];

                    competence.users.map(function(user) {
                         if (vm.office[user.office]) {
                            users.push({'name': user.name, 'level': user.level, 'office': user.office, 'userId': user.userId});
                         }
                    });
                    resultArr.push({'skill': competence.skill, 'users': users});
                    }
                });
                vm.competenceData = resultArr;
            }

            function getUserNamesInSelectedOfficesCSV() {
                var arr = [];
                var userNames = [''];
                vm.competenceData[0].users.map(function(user) {
                    userNames.push(user.name);
                });

                arr.push(userNames);
                return arr;
            }

            function getUserSkillCSV() {
                var resultArr = [];
                vm.competenceData.map(function(competence) {
                    var arr = [];
                    arr.push(competence.skill);

                    competence.users.map(function(user) {
                        arr.push(user.level);
                    });

                    resultArr.push({skills: arr});
                });

                return resultArr;
            }

            function defaultSkillsToValue(value) {
                vm.skills[0].skills.map(function(skill) {
                    vm.skill[skill] = value;
                })
                setCompetenceData();
            }

        }
})();
