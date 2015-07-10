define(['exports', 'module'], function (exports, module) {
    'use strict';

    var routerPlugin = function routerPlugin(router) {

        return function (app) {
            app.set('currentRoute', router.getState());

            router.addListener(function (toState) {
                app.set('currentRoute', toState);
            });
        };
    };

    module.exports = routerPlugin;
});