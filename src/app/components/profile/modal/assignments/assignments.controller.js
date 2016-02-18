(function () {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('AssignmentsController', AssignmentsController);

    function AssignmentsController(AssignmentsModal, UserToAssignment, Users, Assignments, Customers, Domains, Skills, $q, block, user, callback) {
        var vm = this;
        window.vm2 = vm;

        vm.user = {};
        vm.connectors = [];
        vm.connectorsPage = [];
        vm.connectorsToRemove = {};
        vm.connectorsToSave = {};
        vm.currentAssignments = block;
        vm.currentConnector = {};
        vm.currentPage = 0;
        vm.customers = [];
        vm.assignments = [];
        vm.domains = [];
        vm.connectorHash = {};
        vm.assignmentHash = {};
        vm.domainHash = {};
        vm.domainIdHash = {};
        vm.customerHash = {};
        vm.customerIdHash = {};
        vm.tagList = [];

        vm.hideModal = AssignmentsModal.deactivate;
        vm.save = save;
        vm.skillSuggestionsList = {
            data: ['Excelling', 'Being best', 'Winning']
        };
        vm.loadTags = loadTags;
        vm.isValidConnector = isValidConnector;
        vm.hideModal = AssignmentsModal.deactivate;
        vm.save = save;
        vm.addConnector = addConnector;
        vm.saveConnector = saveConnector;
        vm.removeConnector = removeConnector;
        vm.setConnectorForEditing = setConnectorForEditing;
        vm.isEditMode = isEditMode;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.setPage = setPage;
        vm.getPageCount = getPageCount;
        vm.assignmentNameChanged = assignmentNameChanged;

        activate();

        function activate() {
            var promises = {
                domains: Domains.query().$promise,
                customers: Customers.query().$promise,
                assignments: Assignments.query().$promise,
                skills: Skills.query().$promise,
                user: Users.get({_id: user._id}).$promise,
                connectors: UserToAssignment.query({userId: user._id}).$promise
            };
            $q.all(promises)
                .then(function(values) {
                    vm.user = values.user;
                    vm.assignments = values.assignments;
                    vm.customers = values.customers;
                    vm.domains = values.domains;
                    vm.skills = values.skills;
                    vm.connectors = values.connectors;
                    setHashes(vm.customers, vm.domains, vm.skills, vm.assignments, vm.connectors);
                });
        }

        function isValidConnector(connector) {
            return connector.name && connector.name.length
                && connector.domain && connector.domain.length
                && connector.customer && connector.customer.length;
        }

        function isEditMode() {
            return connectorExists(vm.currentConnector);
        }

        // ADD
        //==================================================================

        function addConnector(connector) {
            if (connector && connector.name && !vm.connectorHash[connector.name]) {
                createAssignmentIfNotExists(connector)
                    .then(editAssignmentIfChanged)
                    .then(createConnector)
                    .then(function(connector) {
                        vm.connectorsToSave[connector.name] = convertToSkillIds(angular.copy(connector));
                        vm.currentConnector = angular.copy(connector);
                        vm.currentConnector = convertToDomainName(vm.currentConnector);
                        vm.currentConnector = convertToCustomerName(vm.currentConnector);
                        updateConnectorList();

                        vm.setPage(vm.getPageCount()-1);
                    });
            }
        }

        function createAssignmentIfNotExists(connector) {
            return $q(function(resolve) {
                if (vm.assignmentHash[connector.name]) {
                    return resolve(connector);
                } else {
                    return createDomainIfNotExists(connector)
                        .then(createCustomerIfNotExists)
                        .then(function(connector) {
                            var assignment = new Assignments({
                                name: connector.name,
                                domain: vm.domainHash[connector.domain]._id,
                                customer: vm.customerHash[connector.customer]._id
                            });
                            assignment.$save()
                                .then(function(assignment) {
                                    vm.assignmentHash[assignment.name] = angular.copy(assignment);
                                    updateAssignmentsList();
                                    return resolve(connector);
                                });
                        });
                }
            });
        }

        function createDomainIfNotExists(connector) {
            return $q(function(resolve) {
                if(vm.domainHash[connector.domain] || !(connector.domain && connector.domain.length)) {
                    return resolve(connector);
                } else {
                    var domain = new Domains({name: connector.domain});
                    domain.$save()
                        .then(function(domain) {
                            vm.domainHash[domain.name] = angular.copy(domain);
                            vm.domainIdHash[domain._id] = angular.copy(domain);
                            updateDomainsList();
                            return resolve(connector);
                        });
                }
            });
        }

        function createCustomerIfNotExists(connector) {
            return $q(function(resolve) {
                if(vm.customerHash[connector.customer] || !(connector.customer && connector.customer.length)) {
                    return resolve(connector);
                } else {
                    var customer = new Customers({name: connector.customer});
                    customer.$save()
                        .then(function(customer) {
                            vm.customerHash[customer.name] = angular.copy(customer);
                            vm.customerIdHash[customer._id] = angular.copy(customer);
                            updateCustomersList();
                            return resolve(connector);
                        });
                }
            });
        }

        function createConnector(connector) {
            return $q(function(resolve) {
                var assignment = vm.assignmentHash[connector.name];
                connector.userId = vm.user._id;
                connector.assignmentId = assignment._id;
                connector = new UserToAssignment(connector);
                connector = convertToCustomerId(connector);
                connector = convertToDomainId(connector);
                vm.connectorHash[assignment.name] = convertToSkillIds(angular.copy(connector));
                return resolve(connector);
            });
        }

        // EDIT
        //==================================================================

        function saveConnector(connector) {
            if (connector && connector.name && vm.connectorHash[connector.name]) {
                editConnector(connector)
                    .then(function(connector) {
                        vm.connectorsToSave[connector.name] = convertToSkillIds(angular.copy(connector));
                        delete connector._id;
                        vm.currentConnector = angular.copy(connector);
                        updateConnectorList();
                    });
            }
        }

        function editConnector(connector) {
            return $q(function(resolve) {
                var promises = [];
                var existingConnector = vm.connectorHash[connector.name];
                promises.push(createDomainIfNotExists(connector));
                promises.push(createCustomerIfNotExists(connector));
                $q.all(promises)
                    .then(function(){
                        return editAssignmentIfChanged(connector)
                            .then(function(connector) {
                                var connectorToStore = angular.extend(existingConnector, angular.copy(connector));
                                connectorToStore = convertToCustomerId(connectorToStore);
                                connectorToStore = convertToDomainId(connectorToStore);
                                connectorToStore = convertToSkillIds(connectorToStore);
                                vm.connectorHash[connector.name] = angular.copy(connectorToStore);
                                return resolve(connector);
                        });
                    });
            });
        }

        function editAssignmentIfChanged(connector) {
            return $q(function(resolve) {
                var assignment = vm.assignmentHash[connector.name];
                var currentConnector = angular.copy(connector);
                currentConnector = convertToDomainId(currentConnector);
                currentConnector = convertToCustomerId(currentConnector);
                if(assignment.domain !== currentConnector.domain || assignment.customer !== currentConnector.customer) {
                    assignment.domain = currentConnector.domain;
                    assignment.customer = currentConnector.customer;
                    var assignmentToSave = angular.copy(assignment);
                    assignmentToSave.$save()
                        .then(function() {
                            vm.assignmentHash[assignment.name] = assignment;
                            return resolve(connector);
                        });
                } else {
                    return resolve(connector);
                }
            });
        }

        // REMOVE
        //==================================================================

        function removeConnector(connector) {
            vm.connectorsToRemove[connector.name] = vm.connectorHash[connector.name];
            delete vm.connectorHash[connector.name];
            updateConnectorList();
        }

        function connectorExists(connector) {
            if(vm.connectorHash[connector.name]) {
                return true;
            } else {
                return false;
            }
        }

        function setConnectorForEditing(connector) {
            vm.currentConnector = angular.copy(connector);
            vm.currentConnector = convertToSkillNames(vm.currentConnector);
            vm.currentConnector = convertToCustomerName(vm.currentConnector);
            vm.currentConnector = convertToDomainName(vm.currentConnector);
            vm.editMode = true;
        }

        function save() {

                vm.user = angular.extend(vm.user, vm.assignments);

                vm.user.$save()
                    .then(callback);

            return saveAssignments()
                .then(removeAssignments)
                .then(vm.hideModal)
                .then(callback);
        }

        function loadTags(query, suggestions) {
            return _.filter(suggestions.data, function (str) {
                if (str) {
                    return (str.toLowerCase().indexOf(query.toLowerCase()) > -1);
                } else {
                    return false;
                }
            });
        }

        function skillTagAdded() {
            var tag = vm.currentConnector.skills.pop();
            if (vm.skillHash[tag]) {
                vm.currentConnector.skills.push(tag);
            }
        }

        function setHashes(customers, domains, skills, assignments, connectors) {
            var connectorHash = Object.create(null);
            var assignmentHash = Object.create(null);
            var assignmentIdHash = Object.create(null);
            var domainHash = Object.create(null);
            var customerHash = Object.create(null);
            var domainIdHash = Object.create(null);
            var customerIdHash = Object.create(null);
            var skillHash = Object.create(null);
            var skillIdHash = Object.create(null);

            customers.forEach(function(customer) {
                customerHash[customer.name] = customer;
                customerIdHash[customer._id] = customer;
            });

            vm.customerHash = customerHash;
            vm.customerIdHash = customerIdHash;

            domains.forEach(function(domain) {
                domainHash[domain.name] = domain;
                domainIdHash[domain._id] = domain;
            });

            vm.domainHash = domainHash;
            vm.domainIdHash = domainIdHash;

            skills.forEach(function(skill) {
                skillHash[skill.name] = skill;
                skillIdHash[skill._id] = skill;
            });

            vm.skillHash = skillHash;
            vm.skillIdHash = skillIdHash;

            connectors.forEach(function(connector) {
                assignmentIdHash[connector.assignmentId] = connector;
            });

            assignments.forEach(function(assignment) {
                if (assignmentIdHash[assignment._id]) {
                    connectorHash[assignment.name] = new UserToAssignment(angular.extend(angular.copy(assignment), assignmentIdHash[assignment._id]));
                }
                assignmentHash[assignment.name] = assignment;
            });

            vm.connectorHash = connectorHash;
            vm.assignmentHash = assignmentHash;

            updateLists();
        }

        function convertToSkillNames(assignment) {
            if (assignment.skills) {
                assignment.skills = assignment.skills.map(function(skillId){
                    return vm.skillIdHash[skillId].name;
                });
            }
            return assignment;
        }

        function convertToSkillIds(assignment) {
            if (assignment.skills) {
                assignment.skills = assignment.skills.map(function(skillTag) {
                    if(Object.prototype.toString.call(skillTag) === '[object String]') {
                        return vm.skillHash[skillTag]._id;
                    } else {
                        return vm.skillHash[skillTag.text]._id;
                    }
                });
            }
            return assignment;
        }

        function convertToDomainName(assignment) {
            if (assignment.domain && assignment.domain.length) {
                assignment.domain = vm.domainIdHash[assignment.domain].name;
            }
            return assignment;
        }

        function convertToDomainId(assignment) {
            if (assignment.domain && assignment.domain.length) {
                assignment.domain = vm.domainHash[assignment.domain]._id;
            }
            return assignment;
        }

        function convertToCustomerName(assignment) {
            if (assignment.customer && assignment.customer.length) {
                assignment.customer = vm.customerIdHash[assignment.customer].name;
            }
            return assignment;
        }

        function convertToCustomerId(assignment) {
            if (assignment.customer && assignment.customer.length) {
                assignment.customer = vm.customerHash[assignment.customer]._id;
            }
            return assignment;
        }

        function updateLists() {
            updateConnectorList();
            updateSkillSuggestionsList();
        }

        function updateConnectorList() {
            vm.connectors = Object.keys(vm.connectorHash).map(function(key){return vm.connectorHash[key];});
            vm.setPage(vm.currentPage);
        }

        function updateAssignmentsList() {
            vm.assignments = Object.keys(vm.assignmentHash).map(function(key){return vm.assignmentHash[key];});
        }

        function updateDomainsList() {
            vm.domains = Object.keys(vm.domainHash).map(function(key){return vm.domainHash[key];});
        }

        function updateCustomersList() {
            vm.customers = Object.keys(vm.customerHash).map(function(key){return vm.customerHash[key];});
        }

        function updateSkillSuggestionsList() {
            vm.skillSuggestionsList.data = Object.keys(vm.skillHash);
        }

        function saveAssignments() {
            return $q(function(resolve) {
                var promises = [];
                Object.keys(vm.connectorsToSave).map(function(key) {
                    var connector = vm.connectorsToSave[key];
                    promises.push(connector.$save());
                });
                return $q.all(promises)
                    .then(resolve);
            });
        }

        function assignmentNameChanged(name) {
            var connector = vm.connectorHash[name];
            if (connector) {
                return setConnectorForEditing(connector);
            }
            var assignment = vm.assignmentHash[name];
            if (assignment) {
                vm.currentConnector = angular.copy(assignment);
                vm.currentConnector = convertToDomainName(vm.currentConnector);
                vm.currentConnector = convertToCustomerName(vm.currentConnector);
                delete vm.currentConnector._id;
            }
        }

        function removeAssignments() {
            return $q(function(resolve) {
                var promises = [];
                Object.keys(vm.connectorsToRemove).map(function(key) {
                    promises.push(vm.connectorsToRemove[key].$delete());
                });
                return $q.all(promises)
                    .then(resolve);
            });
        }

        function nextPage() {
            vm.currentPage = vm.currentPage + 1;
            vm.setPage(vm.currentPage);
        }

        function previousPage() {
            vm.currentPage = vm.currentPage - 1;
            vm.setPage(vm.currentPage);
        }

        function setPage(pageNumber) {
            pageNumber = Math.max(pageNumber, 0);
            pageNumber = Math.min(pageNumber, getPageCount() - 1);
            vm.currentPage = pageNumber;

            var firstIndex = pageNumber * 4;
            var lastIndex = Math.min(pageNumber * 4 + 4, vm.connectors.length);
            vm.connectorsPage = vm.connectors.slice(firstIndex, lastIndex);
        }

        function getPageCount() {
            return Math.ceil(vm.connectors.length / 4);
        }

    }
})();
