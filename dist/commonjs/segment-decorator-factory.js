"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = segmentDecoratorFactory;

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
                    var entity = app.entities[component.id];
                    listener(entity.context, app.setState(entity), toState, fromState);
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
module.exports = exports["default"];