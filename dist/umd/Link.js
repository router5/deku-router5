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
        global.Link = mod.exports;
    }
})(this, function (exports, module, _virtualElement) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _element = _interopRequireDefault(_virtualElement);

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
                return (0, _element['default'])('button', { type: 'button', 'class': className, onClick: onClick }, children);
            }

            return (0, _element['default'])('a', { href: href, 'class': className, onClick: onClick }, children);
        }
    };

    module.exports = Link;
});