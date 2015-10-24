'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var routerPlugin = function routerPlugin(router) {
    return function (app) {
        app.set('currentRoute', router.getState());
        router.addListener(function (toState) {
            return app.set('route', toState);
        });
    };
};

exports['default'] = routerPlugin;
module.exports = exports['default'];