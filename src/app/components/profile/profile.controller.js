(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.profile')
        .controller('ProfileController', ProfileController);

        function ProfileController(ProfileModel, $routeParams, API_URL, GeneralInfoModal, ImageModal, PrivateInfoModal) {
            var vm = this;
            window.vm = vm;

            vm.API_URL = API_URL;
            vm.activated = false;
            vm.user = {};

            /* MODAL */
            vm.generalInfoModal = {};
            vm.showModal = showModal;
            vm.hideModal = hideModal;

            /* GENERAL INFO */
            vm.generalInfo = {
                profileImage: '',
                name: '',
                email: '',
                role: {},
                office: {},
                phoneNumber: '',
                employeeNumber: '',
                position: '',
                country: '',
                closestSuperior: '',
                startDateOfEmployment: '',
                endDateOfEmployment: '',
                sex: '',
                description: '',
                personalInterests: '',
                contactInfo: ''
            };

            /* PRIVATE INFO */
            vm.privateInfo = {
                personalIdNumber: '',
                address: '',
                city: '',
                ZIP: '',
                ICEName: '',
                ICEPhone: '',
                foodPreferences: '',
                shirtSize: '',
                addressInfo: '',
                ICEInfo: ''
            };

            /* SKILLS */
            vm.skills = [];

            /* CERTIFICATES */
            vm.certificates = [];

            /* ASSIGNMENTS */
            vm.assignments = [];

            /* CUSTOM HEADERS */
            vm.customHeaders= [];

            /* SOCIAL MEDIA */
            vm.socialMedia = {
                linkedin: '',
                facebook: '',
                twitter: ''
            };

            /* CLOUD */
            vm.cloud = {
                words: [],
                maxWeight: 1
            };

            activate();

            //////////////

            function activate() {
                ProfileModel.get({_id: $routeParams.userId})
                    .$promise.then(function(model) {
                        //model.user.office = {name: 'Karlskrona'};
                        setGeneralInfo(model);
                        setPrivateInfo(model);
                        setSkills(model);
                        setCertificates(model);
                        setAssignments(model);
                        setCloud(model);
                        setUser(model);
                        setGeneralInfoModal();
                        setImageModal();
                        setPrivateInfoModal();
                        vm.activated = true;
                    });
            }

            function setGeneralInfo(model) {
                vm.generalInfo = {
                    profileImage: model.user.profileImage,
                    name: model.user.name,
                    email: model.user.email,
                    role: model.user.role,
                    office: model.user.office,
                    phoneNumber: model.user.phoneNumber,
                    employeeNumber: model.user.employeeNumber,
                    position: model.user.position,
                    country: model.user.country,
                    closestSuperior: model.user.closestSuperior,
                    startDateOfEmployment: model.user.startDateOfEmployment,
                    endDateOfEmployment: model.user.endDateOfEmployment,
                    sex: model.user.sex,
                    description: model.user.description,
                    personalInterests: model.user.personalInterests.join(', ')
                };
            }

            function setPrivateInfo(model) {
                vm.privateInfo = {
                    personalIdNumber: '197403237271',//model.user.personalIdNumber;
                    address: model.user.address,
                    city: model.user.city,
                    ZIP: model.user.ZIP,
                    ICEName: model.user.ICEName,
                    ICEPhone: model.user.ICEPhone,
                    foodPreferences: model.user.foodPreferences,
                    shirtSize: model.user.shirtSize,
                    addressInfo: getAddressInfo(model),
                    ICEInfo: getICEInfo(model),
                };
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

            function setUser(model) {
                vm.user = model.user;
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
                    items.push(model.user.city);
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

            function getGeneralInfo() {
                return vm.generalInfo;
            }

            function getUser() {
                return vm.user;
            }

            /* MODAL */

            function showModal(modal, block) {
                vm.currentModal = modal;
                var locals = {
                    block: angular.copy(block),
                    user: getUser(),
                    callback: activate
                };
                vm.currentModal.activate(locals);
            }

            function hideModal(modal) {
                vm.currentModal.deactivate();
                //modal.$promise.then(modal.hide);
            }

            function setGeneralInfoModal() {
                vm.generalInfoModal = GeneralInfoModal;
            }

            function setPrivateInfoModal() {
                vm.privateInfoModal = PrivateInfoModal;
            }

            function setImageModal() {
                vm.imageModal = ImageModal;
            }

            function refresh() {
                /* */
            }
        }
})();
