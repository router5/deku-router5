'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

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
            return (0, _virtualElement2['default'])(RouteSegment, _extends({}, component.props, component.state));
        };

        return { propTypes: propTypes, initialState: initialState, afterMount: afterMount, render: render };
    };
}

exports['default'] = routeNode;
module.exports = exports['default'];