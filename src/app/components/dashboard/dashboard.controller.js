(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('DashboardController', DashboardController);

        function DashboardController(DashboardModel, $filter) {
            var vm = this;

            vm.competence = {}
            vm.offices = [];
            vm.skills = [];
            vm.skill = [];
            vm.office = [];
            vm.getSelectedSkillsCSV = getSelectedSkillsCSV;
            vm.getUserSkillCSV = getUserSkillCSV;
            vm.setCompetenceData = setCompetenceData;
            vm.setAllSkills = setAllSkills;
            vm.setAllOffices = setAllOffices;
            vm.competenceData = [];
            vm.activated = false;

            activate();

            //////////////

            function activate() {
                DashboardModel.get()
                    .$promise.then(function(model) {
                        vm.competence = model.competence;
                        vm.offices = model.offices; // $filter('orderBy')(model.offices);
                        vm.skills = model.skills;
                        vm.skills[0].skills = $filter('orderBy')(vm.skills[0].skills);
                        vm.skill = [];
                        vm.office = [];
                        vm.competenceData = [];
                        vm.activated = true;
                });
            }

            function setAllSkills(value) {
                vm.skills[0].skills.map(function(skill) {
                    vm.skill[skill] = value;
                });
                setCompetenceData();
            }

            function setAllOffices(value) {
                _.each(vm.offices, function(element) {
                    element = value;
                })
            }

            function setCompetenceData() {
            	var resultArr = [];

            	// Matrix x-axis name
				var competenceData = [];

				// Build list with selected skills
                competenceData.skills = [];
                vm.competence.map(function(competence) {
                    if (vm.skill[competence.skill]) {
	                    competenceData.skills.push(competence.skill);
                    }
                });
                // Sort skills by name
                competenceData.skills = $filter('orderBy')(competenceData.skills);

                // Build list with all users
                competenceData.users = [];
                vm.competence[0].users.map(function(user) {
                     if (vm.office[user.office]) {
                     	var newuser = {'name': user.name, 'skills': [], 'office': user.office, 'userId': user.userId};
                        competenceData.users.push(newuser);
                        // Create (selected) skills for each user
                        competenceData.skills.map(function(skill) {
                        	// Loop through all skills
                        	vm.competence.map(function(competence) {
                        		if (competence.skill === skill) {
                        			// Find user
                        			competence.users.map(function(testuser) {
                        				if (testuser.name === user.name) {
                        					newuser.skills.push({ 'level': testuser.level });
                        				}
                        			});
                        		}
                        	});
                        });
                     }
                });
                // Sort users by name
                competenceData.users = $filter('orderBy')(competenceData.users,'name');

                vm.competenceData = competenceData;
            }

            function getSelectedSkillsCSV() {
            	var result = angular.copy(vm.competenceData.skills);
            	result.unshift('Employee');
                return result;
            }

            function getUserSkillCSV() {
                var resultArr = [];

                vm9.competenceData.users.map(function(user) {
                	var row = [];
                	row.push(user.name);
                	user.skills.map(function(skill) {
                		row.push(skill.level);
                	});
                	resultArr.push(row);
                });


                return resultArr;
            }

        }
})();
