(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', 'virtual-element'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('virtual-element'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.element);
        global.routeNode = mod.exports;
    }
})(this, function (exports, module, _virtualElement) {
    'use strict';

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _element = _interopRequireDefault(_virtualElement);

    function routeNode(nodeName) {
        return function routeNodeWrapper(RouteSegment) {
            var propTypes = {
                router: { source: 'router' }
            };

            var initialState = function initialState(props) {
                return { route: props.router.getState(), previousRoute: null };
            };

            var afterMount = function afterMount(component, elm, setState) {
                component.props.router.addNodeListener(nodeName, function (toState, fromState) {
                    setState({ route: toState, previousRoute: fromState });
                });
            };

            var render = function render(component) {
                return (0, _element['default'])(RouteSegment, _extends({}, component.props, component.state));
            };

            return { propTypes: propTypes, initialState: initialState, afterMount: afterMount, render: render };
        };
    }

    module.exports = routeNode;
});