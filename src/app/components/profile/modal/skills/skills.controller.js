(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('SkillsController', SkillsController);

        function SkillsController(SkillsModal, Users, Skills, UserToSkill, block, user, callback, $q) {
            var vm = this;
            window.vm2 = vm;

            vm.user = {};
            vm.connectors = [];
            vm.skills = [];
            vm.hideModal = SkillsModal.deactivate;
            vm.save = save;
            vm.addConnector = addConnector;
            vm.removeConnector = removeConnector;
            vm.setConnectorForEditing = setConnectorForEditing;
            vm.levels = [];
            vm.connectorHash = {};
            vm.connectorsToRemove = [];
            vm.connectorsToSave = [];
            vm.currentConnector = {};

            activate();

            //////////////

            function activate() {
                var promises = {
                    user: Users.get({ _id: user._id }).$promise,
                    connectors: UserToSkill.query({ userId: user._id }).$promise,
                    skills: Skills.query().$promise
                };

                $q.all(promises)
                    .then(function(values) {
                        vm.user = values.user;
                        vm.connectors = values.connectors;
                        setLevels();
                        setSkills(values.skills);
                        setHashes(values.skills, values.connectors);
                    });
            }

            function addConnector(connector) {
                if (connector && connector.name) {
                    var existingConnector = vm.connectorHash[connector.name];
                    if(!existingConnector) {
                        connector = createSkillIfNotExists(connector)
                            .then(createConnector);
                    } else {
                        connector = editConnector(connector, existingConnector);
                    }
                    connector
                        .then(function(connector) {
                            vm.connectorsToSave.push(connector);
                            updateConnectorList();
                        });
                }
            }

            function removeConnector(skill) {
                vm.connectorsToRemove.push(vm.connectorHash[skill.name]);
                delete vm.connectorHash[skill.name];
                updateConnectorList();
            }

            function createSkillIfNotExists(connector) {
                return $q(function(resolve) {
                    if (vm.skillHash[connector.name]) {
                        return resolve(connector);
                    } else {
                        var skill = new Skills({name: connector.name});
                        skill.$save()
                            .then(function(skill) {
                                vm.skillHash[skill.name] = skill;
                                updateSkillList();
                                return resolve(connector);
                            });
                    }
                });
            }

            function createConnector(connector) {
                return $q(function(resolve) {
                    var skill = vm.skillHash[connector.name];
                    connector.userId = vm.user._id;
                    connector.skillId = skill._id;
                    vm.currentConnector = new UserToSkill(connector);
                    vm.connectorHash[skill.name] = angular.copy(vm.currentConnector);
                    return resolve(vm.currentConnector);
                });
            }

            function editConnector(connector, existingConnector) {
                return $q(function(resolve) {
                    vm.currentConnector = angular.extend(existingConnector, connector);
                    vm.connectorHash[vm.currentConnector.name] = angular.copy(vm.currentConnector);
                    return resolve(vm.currentConnector);
                });
            }

            function setConnectorForEditing(connector) {
                vm.currentConnector = angular.copy(connector);
            }

            function save() {
                return saveSkills()
                    .then(removeSkills)
                    .then(vm.hideModal)
                    .then(callback);
            }

            function setLevels() {
                vm.levels = [
                {
                    value: 1,
                    label: '1'
                },
                {
                    value: 2,
                    label: '2'
                },
                {
                    value: 3,
                    label: '3'
                },
                {
                    value: 4,
                    label: '4'
                },
                {
                    value: 5,
                    label: '5'
                }];
            }

            function setSkills(skills) {
                vm.skills = skills;
            }

            function setHashes(skills, connectors) {
                var connectorHash = Object.create(null);
                var skillHash = Object.create(null);
                var idHash = Object.create(null);
                connectors.forEach(function(connector) {
                    idHash[connector.skillId] = connector;
                });
                skills.forEach(function(skill) {
                    if (idHash[skill._id]) {
                        connectorHash[skill.name] = new UserToSkill(angular.extend(skill, idHash[skill._id]));
                    }
                    skillHash[skill.name] = skill;
                });
                vm.connectorHash = connectorHash;
                vm.skillHash = skillHash;
                updateConnectorList();
            }

            function saveSkills() {
                return $q(function(resolve) {
                    var promises = [];
                    vm.connectorsToSave.forEach(function(skill) {
                        promises.push(skill.$save());
                    });
                    return $q.all(promises)
                        .then(resolve);
                });
            }

            function removeSkills() {
                return $q(function(resolve) {
                    var promises = [];
                    vm.connectorsToRemove.forEach(function(skill) {
                        promises.push(skill.$delete());
                    });
                    return $q.all(promises)
                        .then(resolve);
                });
            }

            function updateConnectorList() {
                vm.connectors = Object.keys(vm.connectorHash).map(function(key){return vm.connectorHash[key];});
            }

            function updateSkillList() {
                vm.skills = Object.keys(vm.skillHash).map(function(key){return vm.skillHash[key];});
            }
        }

})();
