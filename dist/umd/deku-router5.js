(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('dekuRouter5', factory) :
    (global.dekuRouter5 = factory());
}(this, function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    babelHelpers;

    var routerPlugin = function routerPlugin(router) {
        return function (app) {
            app.set('router', router);
            app.set('route', router.getState());
            router.addListener(function (toState) {
                return app.set('route', toState);
            });
        };
    };

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

                    return { type: RouteSegment, children: [], attributes: babelHelpers.extends({}, props, { route: route, previousRoute: previousRoute }) };
                }
            };

            return RouteNode;
        };
    }

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

            var className = (props.class ? props.class.split(' ') : []).concat(active ? [activeClass] : []).join(' ');

            var onClick = props.onClick || clickHandler;

            if (button) {
                return element('button', { type: 'button', 'class': className, onClick: onClick }, children);
            }

            return { type: 'a', children: children, attributes: { href: href, 'class': className, onClick: onClick } };
        }
    };

    var index = {
        Link: Link,
        routeNode: routeNode,
        routerPlugin: routerPlugin
    };

    return index;

}));