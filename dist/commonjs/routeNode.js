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
        var RouteNode = {
            propTypes: {
                router: { source: 'router' }
            },

            afterMount: function afterMount(_ref, elm, setState) {
                var props = _ref.props;

                props.router.addNodeListener(nodeName, function (toState, fromState) {
                    setState({ route: toState, previousRoute: fromState });
                });
            },

            render: function render(_ref2) {
                var props = _ref2.props;
                var state = _ref2.state;
                var route = state.route;
                var previousRoute = state.previousRoute;

                if (route === undefined) {
                    route = props.router.getState();
                    previousRoute = null;
                }

                return (0, _virtualElement2['default'])(RouteSegment, _extends({}, props, { route: route, previousRoute: previousRoute }));
            }
        };

        return RouteNode;
    };
}

exports['default'] = routeNode;
module.exports = exports['default'];