'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

var Link = {
    propTypes: {
        router: { source: 'router' },
        route: { source: 'route' },
        button: { type: 'boolean' },
        routeName: { type: 'string', optional: false },
        routeParams: { type: 'object' },
        routeOptions: { type: 'object' },
        activeClass: { type: 'string' },
        activeStrict: { type: 'function' },
        onClick: { type: 'function' }
    },

    defaultProps: {
        activeClass: 'active',
        button: false,
        activeStrict: false,
        routeParams: {},
        routeOptions: {}
    },

    render: function render(_ref) {
        var props = _ref.props;
        var button = props.button;
        var activeClass = props.activeClass;
        var routeName = props.routeName;
        var routeParams = props.routeParams;
        var routeOptions = props.routeOptions;
        var children = props.children;
        var router = props.router;

        var clickHandler = function clickHandler(evt) {
            evt.preventDefault();
            router.navigate(routeName, routeParams, routeOptions);
        };

        var active = router.isActive(routeName, routeParams);
        var href = router.buildUrl(routeName, routeParams);

        var className = (props['class'] ? props['class'].split(' ') : []).concat(active ? [activeClass] : []).join(' ');

        var onClick = props.onClick || clickHandler;

        if (button) {
            return (0, _virtualElement2['default'])('button', { type: 'button', 'class': className, onClick: onClick }, children);
        }

        return (0, _virtualElement2['default'])('a', { href: href, 'class': className, onClick: onClick }, children);
    }
};

exports['default'] = Link;
module.exports = exports['default'];