(function () {
    'use strict';

    angular
        .module('xyz-cv-ui.profile.modal')
        .controller('CertificatesController', CertificatesController);

    function CertificatesController(CertificatesModal, UserToCertificate, Users, Certificates, Skills, $q, block, user, callback) {
        var vm = this;
        window.vm2 = vm;

        vm.user = {};
        vm.connectors = [];
        vm.connectorsPage = [];
        vm.connectorsToRemove = {};
        vm.connectorsToSave = {};
        vm.currentCertificates = block;
        vm.currentConnector = {};
        vm.currentPage = 0;
        vm.certificates = [];
        vm.connectorHash = {};
        vm.certificateHash = {};

        vm.tagList = [];

        vm.hideModal = CertificatesModal.deactivate;
        vm.save = save;
        vm.skillSuggestionsList = {
            data: ['Excelling', 'Being best', 'Winning']
        };
        vm.loadTags = loadTags;
        vm.isValidConnector = isValidConnector;
        vm.hideModal = CertificatesModal.deactivate;
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
        vm.certificateNameChanged = certificateNameChanged;
        vm.certificateDescriptionChanged = certificateDescriptionChanged;

        activate();

        function activate() {
            var promises = {
                certificates: Certificates.query().$promise,
                skills: Skills.query().$promise,
                user: Users.get({_id: user._id}).$promise,
                connectors: UserToCertificate.query({userId: user._id}).$promise
            };
            $q.all(promises)
                .then(function(values) {
                    vm.user = values.user;
                    vm.certificates = values.certificates;
                    vm.skills = values.skills;
                    vm.connectors = values.connectors;
                    setHashes(vm.skills, vm.certificates, vm.connectors);
                });
        }

        function isValidConnector(connector) {
            return connector.name && connector.name.length;
        }

        function isEditMode() {
            return connectorExists(vm.currentConnector);
        }

        // ADD
        //==================================================================

        function addConnector(connector) {
            if (connector && connector.name && !vm.connectorHash[connector.name]) {
                createCertificateIfNotExists(connector)
                    .then(editCertificateIfChanged)
                    .then(createConnector)
                    .then(function(connector) {
                        vm.connectorsToSave[connector.name] = convertToSkillIds(angular.copy(connector));
                        vm.currentConnector = angular.copy(connector);
                        updateConnectorList();

                        vm.setPage(vm.getPageCount() - 1);
                    });
            }
        }

        function createCertificateIfNotExists(connector) {
            return $q(function(resolve) {
                if (vm.certificateHash[connector.name]) {
                    return resolve(connector);
                }
                else {
                    var certificate = new Certificates({
                        name: connector.name,
                        description: connector.description
                    });
                    certificate.$save()
                        .then(function(certificate) {
                            vm.certificateHash[certificate.name] = angular.copy(certificate);
                            updateCertificatesList();
                            return resolve(connector);
                        });
                }
            });
        }

        function createConnector(connector) {
            return $q(function(resolve) {
                var certificate = vm.certificateHash[connector.name];
                connector.userId = vm.user._id;
                connector.certificateId = certificate._id;
                connector = new UserToCertificate(connector);
                vm.connectorHash[certificate.name] = convertToSkillIds(angular.copy(connector));
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
                $q.all(promises)
                    .then(function() {
                        return editCertificateIfChanged(connector)
                            .then(function(connector) {
                                var connectorToStore = angular.extend(existingConnector, angular.copy(connector));
                                vm.connectorHash[connector.name] = angular.copy(connectorToStore);
                                return resolve(connector);
                            });
                    });
            });
        }

        function editCertificateIfChanged(connector) {
            return $q(function(resolve) {
                var certificate = vm.certificateHash[connector.name];
                vm.currentConnector = angular.copy(connector);
                if (certificate.description !== connector.description) {
                    certificate.description = connector.description;
                    var certificateToSave = angular.copy(certificate);
                    certificateToSave.$save()
                        .then(function() {
                            vm.certificateHash[certificate.name] = certificate;
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
            if (vm.connectorHash[connector.name]) {
                return true;
            } else {
                return false;
            }
        }

        function setConnectorForEditing(connector) {
            vm.currentConnector = angular.copy(connector);
            vm.currentConnector = convertToSkillNames(vm.currentConnector);
            vm.editMode = true;
        }

        function save() {
            return saveCertificates()
                .then(removeCertificates)
                .then(vm.user.$save())
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

        function setHashes(skills, certificates, connectors) {
            var connectorHash = Object.create(null);
            var certificateHash = Object.create(null);
            var certificateIdHash = Object.create(null);
            var skillHash = Object.create(null);
            var skillIdHash = Object.create(null);

            skills.forEach(function(skill) {
                skillHash[skill.name] = skill;
                skillIdHash[skill._id] = skill;
            });

            vm.skillHash = skillHash;
            vm.skillIdHash = skillIdHash;

            connectors.forEach(function(connector) {
                certificateIdHash[connector.certificateId] = connector;
            });

            certificates.forEach(function(certificate) {
                if (certificateIdHash[certificate._id]) {
                    connectorHash[certificate.name] = new UserToCertificate(angular.extend(angular.copy(certificate), certificateIdHash[certificate._id]));
                }
                certificateHash[certificate.name] = certificate;
            });

            vm.connectorHash = connectorHash;
            vm.certificateHash = certificateHash;

            updateLists();
        }

        function convertToSkillNames(certificate) {
            if (certificate.skills) {
                certificate.skills = certificate.skills.map(function(skillId) {
                    return vm.skillIdHash[skillId].name;
                });
            }
            return certificate;
        }

        function convertToSkillIds(certificate) {
            if (certificate.skills) {
                certificate.skills = certificate.skills.map(function(skillTag) {
                    if (Object.prototype.toString.call(skillTag) === '[object String]') {
                        return vm.skillHash[skillTag]._id;
                    } else {
                        return vm.skillHash[skillTag.text]._id;
                    }
                });
            }
            return certificate;
        }

        function updateLists() {
            updateConnectorList();
            updateSkillSuggestionsList();
        }

        function updateConnectorList() {
            vm.connectors = Object.keys(vm.connectorHash).map(function(key) {return vm.connectorHash[key];});
            vm.setPage(vm.currentPage);
        }

        function updateCertificatesList() {
            vm.certificates = Object.keys(vm.certificateHash).map(function(key) {return vm.certificateHash[key];});
        }

        function updateSkillSuggestionsList() {
            vm.skillSuggestionsList.data = Object.keys(vm.skillHash);
        }

        function saveCertificates() {
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

        function certificateNameChanged(name) {
            var connector = vm.connectorHash[name];
            if (connector) {
                return setConnectorForEditing(connector);
            }
            var certificate = vm.certificateHash[name];
            if (certificate) {
                vm.currentConnector = angular.copy(certificate);
                delete vm.currentConnector._id;
            }
        }

        function certificateDescriptionChanged(description) {
            var connector = vm.connectorHash[description];
            if (connector) {
                return setConnectorForEditing(connector);
            }
            var certificate = vm.certificateHash[description];
            if (certificate) {
                vm.currentConnector = angular.copy(certificate);
                delete vm.currentConnector._id;
            }
        }

        function removeCertificates() {
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
