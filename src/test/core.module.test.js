describe('xyz-cv-ui.core', function() {

    var module;
    before(function() {
        module = angular.module('xyz-cv-ui.core');
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
            dependencies = module.value('core.module').requires;
        });

        it('should have ngAnimate as a dependency', function() {
            expect(hasModule('ngAnimate')).to.equal(true);
        });

        it('should have ngRoute as a dependency', function() {
            expect(hasModule('ngRoute')).to.equal(true);
        });

        it('should have ngSanitize as a dependency', function() {
            expect(hasModule('ngSanitize')).to.equal(true);
        });

        it('should have blocks.exception as a dependency', function() {
            expect(hasModule('blocks.exception')).to.equal(true);
        });

        it('should have blocks.logger as a dependency', function() {
            expect(hasModule('blocks.logger')).to.equal(true);
        });

        it('should have blocks.router as a dependency', function() {
            expect(hasModule('blocks.router')).to.equal(true);
        });

        it('should have ngplus as a dependency', function() {
            expect(hasModule('ngplus')).to.equal(true);
        });
    });
});
