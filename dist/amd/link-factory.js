define(['exports', 'module', 'deku'], function (exports, module, _deku) {
    'use strict';

    // Use of a factory rather than source as having nested routers
    // are not excluded
    module.exports = linkFactory;

    function linkFactory(router) {
        var propTypes = {
            currentRoute: { source: 'currentRoute' },
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

        var clickHandler = function clickHandler(evt, component, updateState) {
            evt.preventDefault();

            var props = component.props;

            router.navigate(props.routeName, props.routeParams, props.routeOptions);
        };

        var render = function render(component, el) {
            var props = component.props;

            var active = router.isActive(props.routeName, props.routeParams);
            var href = router.buildUrl(props.routeName, props.routeParams);
            var className = (props['class'] ? props['class'].split(' ') : []).concat(active ? [props.activeClass] : []).join(' ');

            var onClick = props.onClick || clickHandler;

            if (props.button) {
                return (0, _deku.element)('button', { type: 'button', 'class': className, onClick: onClick }, props.children);
            }
            return (0, _deku.element)('a', { href: href, 'class': className, onClick: onClick }, props.children);
        };

        return { propTypes: propTypes, defaultProps: defaultProps, render: render };
    }
});