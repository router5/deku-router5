(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.routerPlugin = mod.exports;
    }
})(this, function (exports, module) {
    'use strict';

    var routerPlugin = function routerPlugin(router) {
        return function (app) {
            app.set('router', router);
            app.set('route', router.getState());
            router.addListener(function (toState) {
                return app.set('route', toState);
            });
        };
    };

    module.exports = routerPlugin;
});