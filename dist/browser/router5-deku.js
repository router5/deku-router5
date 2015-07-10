/**
 * @license
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 router5
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function () {
'use strict';

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
            return element('button', { type: 'button', 'class': className, onClick: onClick }, props.children);
        }
        return element('a', { href: href, 'class': className, onClick: onClick }, props.children);
    };

    return { propTypes: propTypes, defaultProps: defaultProps, render: render };
}

// Use of a factory rather than source as having nested routers
// are not excluded
function segmentDecoratorFactory(router, app) {
    var listeners = {};
    var components = {};

    return function SegmentDecorator(target, routeName, listener) {
        var afterMount = target.afterMount;
        var beforeUnmount = target.beforeUnmount;

        target.afterMount = function (component, el, setState) {
            if (afterMount) afterMount(component, el, setState);

            if (listener) {
                listeners[component.id] = function (toState, fromState) {
                    var context = app.entities[component.id].context;
                    var setState = function setState() {};
                    listener(context, setState, toState, fromState);
                };
                router.addNodeListener(routeName, listeners[component.id]);
            }

            if (target.canDeactivate) {
                components[component.id] = {
                    canDeactivate: function canDeactivate(toState, fromState) {
                        // var context = {};
                        var context = app.entities[component.id].context;
                        target.canDeactivate(context, toState, fromState);
                    }
                };
                router.registerComponent(routeName, components[component.id]);
            }
        };

        target.beforeUnmount = function (component, el) {
            if (beforeUnmount) beforeUnmount(component, el);

            if (listeners[component.id]) {
                router.removeNodeListener(routeName, listeners[component.id]);
                delete components[component.id];
            }

            if (components[component.id]) {
                router.deregisterComponent(routeName, registeredComponent);
            }
        };

        return target;
    };
}

window.linkFactory = linkFactory;
window.segmentDecoratorFactory = segmentDecoratorFactory;

}());
