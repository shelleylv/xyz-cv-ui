(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.updatedList')
        .controller('UpdatedListController', UpdatedListController);

        function UpdatedListController(SearchModel, Skills, Files, API_URL, $q, Offices, Assignments, Roles) {
            var vm = this;

            vm.API_URL = API_URL;
            vm.baseUrl = '#/profile/';
            vm.result = [];

            vm.tagList = [];
            vm.suggestedTags = '';
            vm.levels = [];
            vm.newSkill = {};

            vm.suggestedSkills = [];
            vm.suggestedRoles = [];
            vm.suggestedOffices = [];
            vm.suggestedAssignments = [];

            vm.refinedSkills = [];
            vm.refinedRoles = [];
            vm.refinedOffices = [];
            vm.refinedAssignments = [];

            vm.refinedIsShown = false;

            vm.doAdvancedSearch = doAdvancedSearch;
            vm.getSuggestedTags = getSuggestedTags;

            vm.activated = false;
            vm.displayMode = 'table';

            activate();

            function activate() {

                SearchModel.get()
                    .$promise.then(function(value) {
                        vm.suggestedTags = value.tagList;
                        doEmptySearch()
                            .then(function(data) {
                                vm.activated = true;
                                return getProfileImages(data);
                            });
                    });

                Skills.query().$promise
                    .then(function(skills) {
                        vm.suggestedSkills = skills;
                    });

                Offices.query().$promise
                    .then(function(offices) {
                        vm.suggestedOffices = offices;
                    });

                Assignments.query().$promise
                    .then(function(assignments) {
                        vm.suggestedAssignments = assignments;
                    });

                Roles.query().$promise
                    .then(function(roles) {
                        vm.suggestedRoles = roles;
                    });
            }

            function doEmptySearch() {
                return SearchModel.query({searchType: 'advancedSearch/','parameters': {tags: [], refinedSkills: [], refinedRoles: [], refinedOffices: [], refinedAssignments: []}})
                    .$promise.then(function(value) {
                        vm.result = value;
                        return value;
                    });
            }

            function doAdvancedSearch() {
                var tags = fillTagList();
                vm.refinedSkills = cleanRefined();
                var urlObject = {tags: tags, refinedSkills: vm.refinedSkills, refinedOffices: vm.refinedOffices, refinedAssignments: vm.refinedAssignments, refinedRoles: vm.refinedRoles};
                SearchModel.query({searchType: 'advancedSearch/','parameters': urlObject}).$promise
                    .then(function(value) {
                        if (vm.refinedSkills.length === 0) {
                            vm.refinedSkills = [];
                        }

                        vm.result = value;
                        return value;
                    })
                    .then(function(data) {
                        return getProfileImages(data);
                    });
            }

            function getSuggestedTags(query) {
                var result = [];
                vm.suggestedTags.forEach(function(suggestedTag) {
                    if (suggestedTag.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                        result.push(suggestedTag);
                    }
                });

                result.sort(function(a, b) {
                    return a.toLowerCase().indexOf(query.toLowerCase()) < b.toLowerCase().indexOf(query.toLowerCase()) ? -1 : 1;
                });

                return result;
            }

            function fillTagList() {
                var tags = [];
                for (var tag in vm.tagList) {
                    if (vm.tagList.hasOwnProperty(tag)) {
                        tags.push(vm.tagList[tag].text);
                    }
                }

                return tags;
            }

            function cleanRefined() {
                var list = [];
                for (var i = 0; i < vm.refinedSkills.length; i++) {
                    if (!isBadFilter(vm.refinedSkills[i])) {
                        list.push(vm.refinedSkills[i]);
                    }
                }
                if (list.length === 0) {
                    return [];
                }
                return list;
            }

            function isBadFilter(object) {
                return ((!object) || (!object.name) || (object.name.length === 0));
            }

            function getProfileImages(users) {
                return $q(function(resolve) {
                    var list = [];
                    users.forEach(function(user) {
                        if (user.profileImage) {
                            list.push(Files.get({_id: user.profileImage }).$promise
                                .then(function(file) {
                                    user.profileImage = file;
                                }));
                        }
                    });

                    return $q.all(list)
                        .then(resolve);
                });
            }

            function editSkill(skill) {
                vm.newSkill = angular.copy(skill);
            }

            //////////////

            function refresh() {
                /* */
            }
        }
})();
