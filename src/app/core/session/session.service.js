(function() {
    'use strict';

    angular
        .module('core.session')
        .factory('session', session);

    function session($rootScope, Authentication, $sessionStorage, $q) {

        var sessionScope = $rootScope.$new(true);
        sessionScope.$storage = $sessionStorage;
        var activated = $q.defer();
        var service = {
            isAllowed: isAllowed,
            canView: canView,
            isSelf: isSelf,
            isLoaded: isLoaded
        };

        if (!sessionExists()) {
            setUserPropertiesInSession();
        } else {
            activated.resolve();
        }

        return service;

        function sessionExists() {
            return (sessionScope.$storage.userAttributes && sessionScope.$storage.userId);
        }

        function setUserPropertiesInSession() {
            getUserProperties().then(function(properties) {
                sessionScope.$storage.userAttributes = properties.attributes;
                sessionScope.$storage.userId = properties.userId;
                activated.resolve();
            });
        }

        function getUserProperties() {
            return Authentication.get()
                .$promise.then(function(userAttributes) {
                    return userAttributes;
            });
        }

        function isAllowed(attribute) {
            var myAttributes = sessionScope.$storage.userAttributes;
            for (var attr in myAttributes) {
                if (myAttributes[attr].name === attribute) {
                    return true;
                }
            }

            return false;
        }

        function canView(attribute, property) {
            var myAttributes = sessionScope.$storage.userAttributes;
            for (var attr in myAttributes) {
                if (myAttributes[attr].name === attribute && myAttributes[attr].hiddenFields) {
                    return (myAttributes[attr].hiddenFields.indexOf(property) > -1);
                }
            }

            return false;
        }

        function isSelf(id) {
            return (sessionScope.$storage.userId === id);
        }

        function isLoaded() {
            return activated.promise;
        }
    }
})();
