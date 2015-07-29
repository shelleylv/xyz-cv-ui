(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(ProfileModel, $routeParams, API_URL, $modal, $scope) {
            var vm = this;
            window.vm = this;
            window.scope = $scope;
            vm.editGeneralInfoModal = $modal({
                template: '/xyz-cv-ui/components/profile/editGeneralInfo.html',
                show: false,
                scope: $scope
            });
            vm.showModal = function(modal) {
                $scope.profile = {
                    name: vm.name,
                    email: vm.email,
                    role: vm.role,
                    office: vm.office,
                    phoneNumber: vm.phoneNumber,
                    employeeNumber: vm.employeeNumber,
                    position: vm.position,
                    country: vm.country,
                    closestSuperior: vm.closestSuperior,
                    startDateOfEmployment: vm.startDateOfEmployment,
                    endDateOfEmployment: vm.endDateOfEmployment,
                    sex: vm.sex,
                    description: vm.description,
                    personalInterests: vm.personalInterests,
                    contactInfo: vm.contactInfo
                };
                $scope.offices = [
                    {value: 'Stockholm', label: '<span class="flag-icon flag-icon-se"></span> Stockholm'},
                    {value: 'Malmö', label: '<span class="flag-icon flag-icon-se"></span> Malmö'},
                    {value: 'Karlskrona', label: '<span class="flag-icon flag-icon-se"></span> Karlskrona'},
                    {value: 'Sarajevo', label: '<span class="flag-icon flag-icon-ba"></span> Sarajevo'}
                ];
                $scope.countries = [
                    {value: 'Sweden', label: '<span class="flag-icon flag-icon-se"></span> Sweden'},
                    {value: 'Finland', label: '<span class="flag-icon flag-icon-fi"></span> Finland'},
                    {value: 'Denmark', label: '<span class="flag-icon flag-icon-dk"></span> Denmark'},
                    {value: 'Norway', label: '<span class="flag-icon flag-icon-no"></span> Norway'},
                    {value: 'Bosnia', label: '<span class="flag-icon flag-icon-ba"></span> Bosnia & Herzegovina'}
                ];
                modal.scope = $scope;
                vm.currentModal = modal;
                modal.$promise.then(modal.show);
            };
            vm.hideModal = function(modal) {
                console.log("modal");
                modal.$promise.then(modal.hide);
            };

            vm.API_URL = API_URL;
            vm.activated = false;

            /* GENERAL INFO */
            vm.profileImage = '';
            vm.name = '';
            vm.email = '';
            vm.role = {};
            vm.office = {};
            vm.phoneNumber = '';
            vm.employeeNumber = '';
            vm.position = '';
            vm.country = '';
            vm.closestSuperior = '';
            vm.startDateOfEmployment = '';
            vm.endDateOfEmployment = '';
            vm.sex = '';
            vm.description = '';
            vm.personalInterests = '';
            vm.contactInfo = '';

            /* PRIVATE INFO */
            vm.personalIdNumber = '';
            vm.address = '';
            vm.city = '';
            vm.ZIP = '';
            vm.ICEName = '';
            vm.ICEPhone = '';
            vm.foodPreferences = '';
            vm.shirtSize = '';
            vm.addressInfo = '';
            vm.ICEInfo = '';

            /* SKILLS */
            vm.skills = [];

            /* CERTIFICATES */
            vm.certificates= [];

            /* ASSIGNMENTS */
            vm.assignments = [];

            /* CUSTOM HEADERS */
            vm.customHeaders= [];

            /* SOCIAL MEDIA */
            vm.linkedin = '';
            vm.facebook = '';
            vm.twitter = '';

            /* CLOUD */
            vm.cloud = {};
            vm.cloud.words = [];
            vm.cloud.maxWeight = 1;

            activate();

            //////////////

            function activate() {
                ProfileModel.get({id: $routeParams.userId})
                    .$promise.then(function(model) {
                        //model.user.office = {name: 'Karlskrona'};
                        setGeneralInfo(model);
                        setPrivateInfo(model);
                        setSkills(model);
                        setCertificates(model);
                        setAssignments(model);
                        setCloud(model);
                        vm.activated = true;
                    });
            }

            function setGeneralInfo(model) {
                vm.profileImage = model.user.profileImage;
                vm.name = model.user.name;
                vm.email = model.user.email;
                vm.role = model.user.role;
                vm.office = model.user.office;
                vm.phoneNumber = model.user.phoneNumber;
                vm.employeeNumber = model.user.employeeNumber;
                vm.position = model.user.position;
                vm.country = model.user.country;
                vm.closestSuperior = model.user.closestSuperior;
                vm.startDateOfEmployment = model.user.startDateOfEmployment;
                vm.endDateOfEmployment = model.user.endDateOfEmployment;
                vm.sex = model.user.sex;
                vm.description = model.user.description;
                vm.personalInterests = model.user.personalInterests.join(', ');
                vm.contactInfo = getContactInfo(model);
            }

            function setPrivateInfo(model) {
                vm.personalIdNumber = '197403237271'//model.user.personalIdNumber;
                vm.address = model.user.address;
                vm.city = model.user.city;
                vm.ZIP = model.user.ZIP;
                vm.ICEName = model.user.ICEName;
                vm.ICEPhone = model.user.ICEPhone;
                vm.foodPreferences = model.user.foodPreferences;
                vm.shirtSize = model.user.shirtSize;
                vm.addressInfo = getAddressInfo(model);
                vm.ICEInfo = getICEInfo(model);
            }

            function setSkills(model) {
                vm.skills = model.user.skills;
            }

            function setCertificates(model) {
                vm.certificates = model.user.certificates;
            }

            function setAssignments(model) {
                vm.assignments = model.user.assignments;
            }

            function setCloud(model) {
                vm.cloud = model.cloud;
            }

            function getContactInfo(model) {
                var items = [];
                if (model.user.phoneNumber) {
                    items.push(model.user.phoneNumber);
                }
                if (model.user.email) {
                    items.push(model.user.email);
                }
                if (model.user.office) {
                    items.push(model.user.office.name)
                }
                if (model.user.country) {
                    items.push(model.user.country);
                }
                if (model.user.closestSuperior) {
                    items.push(model.user.closestSuperior);
                }
                return items.join(' | ');
            }

            function getAddressInfo(model) {
                var items = [];
                if (model.user.address) {
                    items.push(model.user.address);
                }
                if (model.user.ZIP) {
                    items.push(model.user.ZIP);
                }
                if (model.user.city) {
                    items.push(model.user.city)
                }
                return items.join(' | ');
            }

            function getICEInfo(model) {
                var items = [];
                if (model.user.ICEName) {
                    items.push(model.user.ICEName);
                }
                if (model.user.ICEPhone) {
                    items.push(model.user.ICEPhone);
                }
                return items.join(' | ');
            }

            function refresh() {
                /* */
            }
        }
})();
