(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './Link', './routeNode', './routerPlugin'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('./Link'), require('./routeNode'), require('./routerPlugin'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.Link, global.routeNode, global.routerPlugin);
        global.index = mod.exports;
    }
})(this, function (exports, module, _Link, _routeNode, _routerPlugin) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _Link2 = _interopRequireDefault(_Link);

    var _routeNode2 = _interopRequireDefault(_routeNode);

    var _routerPlugin2 = _interopRequireDefault(_routerPlugin);

    module.exports = {
        Link: _Link2['default'],
        routeNode: _routeNode2['default'],
        routerPlugin: _routerPlugin2['default']
    };
});