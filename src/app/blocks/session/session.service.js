(function() {
    'use strict';

    angular
        .module('blocks.session')
        .factory('session', session);

    function session($rootScope, Authentication, $sessionStorage) {

        var sessionScope = $rootScope.$new(true);
        sessionScope.$storage = $sessionStorage;

        var service = {
            isAllowed: isAllowed,
            canView: canView,
            isSelf: isSelf
        };

        if (!sessionExists()) {
            setUserPropertiesInSession();
        }

        return service;

        function getUserProperties() {
            return Authentication.get()
                .$promise.then(function(userAttributes) {
                    return userAttributes;
            });
        }

        function sessionExists() {
            return (sessionScope.$storage.userAttributes && sessionScope.$storage.userId);
        }

        function setUserPropertiesInSession() {
            getUserProperties().then(function(properties) {
                sessionScope.$storage.userAttributes = properties.attributes;
                sessionScope.$storage.userId = properties.userId;
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
    }
})();
