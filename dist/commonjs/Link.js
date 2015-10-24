'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _virtualElement = require('virtual-element');

var propTypes = {
    router: { source: 'router' },
    route: { source: 'route' },
    button: { type: 'boolean' },
    routeName: { type: 'string', optional: false },
    routeParams: { type: 'object' },
    routeOptions: { type: 'object' },
    activeClass: { type: 'string' },
    activeStrict: { type: 'function' },
    onClick: { type: 'function' }
};

var defaultProps = {
    activeClass: 'active',
    button: false,
    activeStrict: false,
    routeParams: {},
    routeOptions: {}
};

var clickHandler = function clickHandler(evt, component) {
    evt.preventDefault();

    var _component$props = component.props;
    var routeName = _component$props.routeName;
    var routeParams = _component$props.routeParams;
    var routeOptions = _component$props.routeOptions;

    router.navigate(routeName, routeParams, routeOptions);
};

var render = function render(_ref) {
    var props = _ref.props;
    var button = props.button;
    var activeClass = props.activeClass;
    var routeName = props.routeName;
    var routeParams = props.routeParams;
    var children = props.children;

    var active = router.isActive(routeName, routeParams);
    var href = router.buildUrl(routeName, routeParams);

    var className = (props['class'] ? props['class'].split(' ') : []).concat(active ? [activeClass] : []).join(' ');

    var onClick = props.onClick || clickHandler;

    if (button) {
        return (0, _virtualElement.element)('button', { type: 'button', 'class': className, onClick: onClick }, children);
    }

    return (0, _virtualElement.element)('a', { href: href, 'class': className, onClick: onClick }, children);
};

exports['default'] = { propTypes: propTypes, defaultProps: defaultProps, render: render };
module.exports = exports['default'];