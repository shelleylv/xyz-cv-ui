(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.advancedSearch')
        .controller('AdvancedSearchController', AdvancedSearchController);

        function AdvancedSearchController(SearchModel, Skills, Files, API_URL, $q, Offices) {
            var vm = this;
            window.vm4 = vm;
            vm.API_URL = API_URL;
            vm.baseUrl = '#/profile/';
            vm.result = [];

            vm.tagList = [];
            vm.suggestedTags = "";

            vm.suggestedSkills = [];
            vm.suggestedRoles = [];
            vm.suggestedOffices = [];
            vm.suggestedAssignments = [];


            vm.refinedSkills = [{name: "", level: "", years: ""}];
            vm.refinedRoles = [];
            vm.refinedOffices = [];
            vm.refinedAssignments = [];

            vm.refinedIsShown = false;
            vm.buttonTextRefined = 'More options';

            vm.doAdvancedSearch = doAdvancedSearch;
            vm.getSuggestedTags = getSuggestedTags;
            vm.addFilterRow = addFilterRow;
            vm.removeFilterRow = removeFilterRow;
            vm.toggleRefined = toggleRefined;
            vm.clearAll = clearAll;
            vm.activated = false;

            activate();

            function activate() {
                SearchModel.get()
                    .$promise.then(function(value) {
                        vm.suggestedTags = value.tagList;
                    });

                Skills.query().$promise
                    .then(function(skills) {
                        vm.suggestedSkills = skills;
                    })

                Offices.query().$promise
                    .then(function(offices) {
                        vm.suggestedOffices = offices;
                    })

                SearchModel.query({searchType: 'advancedSearch/','parameters': {tags: [], refinedSkills: [], refinedRoles: [], refinedOffices: [], refinedAssignments: []}})
                    .$promise.then(function(value) {
                        vm.result = value;
                        return value;
                    })

                    .then(function(data) {
                        vm.activated = true;
                        return getProfileImages(data);
                    });
            }

            function doAdvancedSearch() {
                var tags = fillTagList();
                vm.refinedSkills = cleanRefined();
                var urlObject = {tags: tags, refinedSkills: vm.refinedSkills, refinedOffices: vm.refinedOffices, refinedAssignments: vm.refinedAssignments, refinedRoles: vm.refinedRoles};

                SearchModel.query({searchType: 'advancedSearch/','parameters': urlObject}).$promise
                    .then(function(value) {
                        if (vm.refinedSkills.length === 0) {
                            vm.refinedSkills = [{name: "", level: "", years: ""}];
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
                    if (suggestedTag.toLowerCase().match(query.toLowerCase())) {
                        result.push(suggestedTag);
                    }
                })

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

                return list;
            }

            function isBadFilter(object) {
                return ((!object) || (!object.name) || (object.name.length === 0));
            }

            function addFilterRow() {
                vm.refinedSkills.push({name: "", level: "", years: ""});
            }

            function removeFilterRow() {
                if (vm.refinedSkills.length != 1) {
                    vm.refinedSkills.pop();
                }
            }

            function toggleRefined() {
                if (!vm.refinedIsShown) {
                    vm.buttonTextRefined = 'Hide options';
                } else {
                    vm.buttonTextRefined = 'More options';
                }

                vm.refinedIsShown = !vm.refinedIsShown;
            }

            function getProfileImages(users) {
                return $q(function(resolve) {
                    var list = [];
                    users.forEach(function(user) {
                        if (user.profileImage) {
                            console.log('getting profile image for user');
                            list.push(Files.get({_id: user.profileImage }).$promise
                                .then(function(file) {
                                    user.profileImage = file;
                                }))
                        }
                    });

                    return $q.all(list)
                        .then(resolve);
                })
            }

            function clearAll() {
                vm.tagList = [];
                vm.refinedSkills = [{name: "", level: "", years: ""}];
                vm.refinedRoles = [];
                vm.refinedOffices = [];
                vm.refinedPositions = [];
                vm.refinedAssignments = [];
                doAdvancedSearch();
            }
            //////////////

            function refresh() {
                /* */
            }
        }
})();
