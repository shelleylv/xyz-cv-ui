describe('xyz-cv-ui', function() {

    var module;
    before(function() {
        module = angular.module('xyz-cv-ui');
    });

    it('should be registered', function() {
        expect(module).not.to.equal(null);
    });

    describe('Dependencies:', function() {
        var dependencies;
        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };
        before(function() {
            dependencies = module.value('xyz-cv-ui').requires;
        });

        it('should have xyz-cv-ui.core as a dependency', function() {
            expect(hasModule('xyz-cv-ui.core')).to.equal(true);
        });

        it('should have xyz-cv-ui.dashboard as a dependency', function() {
            expect(hasModule('xyz-cv-ui.dashboard')).to.equal(true);
        });

        it('should have xyz-cv-ui.profile as a dependency', function() {
            expect(hasModule('xyz-cv-ui.profile')).to.equal(true);
        });
    });
});
