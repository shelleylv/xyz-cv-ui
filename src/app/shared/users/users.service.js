(function() {
    'use strict';

    angular
        .module('shared.users')
        .factory('UsersService', UsersService);

    function UsersService(Users, $q, $timeout) {
        var users = [];
        var current = {};
        var called = false;

        var service = {
            getUsers: getUsers,
            getCurrent: getCurrent
        };

        return service;

        /////////////////

        function getUsers() {
            return $q(function(resolve) {
                if (users.length) {
                    return resolve(users);
                } else {
                    waitIfCalled()
                        .then(function() {
                            Users.query().$promise
                                .then(function(res) {
                                    users = res;
                                    return resolve(users);
                                });
                        });
                }
            });
        }

        function getCurrent() {
            return $q(function(resolve) {
                if (current._id) {
                    return resolve(current);
                } else {
                    waitIfCalled()
                        .then(function() {
                            Users.get({_id: 'current'}).$promise
                                .then(function(res) {
                                    current = res;
                                    return resolve(current);
                                });
                        });
                }
            });
        }

        function waitIfCalled() {
            return $q(function(resolve) {
                if (called) {
                    $timeout(function() {
                        return resolve();
                    }, 150);
                }
                return resolve();
            });
        }
    }

})();
