describe('xyz-cv-ui.access', function() {

    var module;
    before(function() {
        module = angular.module('xyz-cv-ui.access');
    });

    it('should be registered', function() {
        expect(module).not.to.equal(null);
    });
});
