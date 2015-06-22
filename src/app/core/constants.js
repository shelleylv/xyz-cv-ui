/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
