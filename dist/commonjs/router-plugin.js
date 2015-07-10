'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var routerPlugin = function routerPlugin(router) {

    return function (app) {
        app.set('currentRoute', router.getState());

        router.addListener(function (toState) {
            app.set('currentRoute', toState);
        });
    };
};

exports['default'] = routerPlugin;
module.exports = exports['default'];