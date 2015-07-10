export default segmentDecoratorFactory

function segmentDecoratorFactory(router, app) {
    let listeners = {}
    let components = {}

    return function SegmentDecorator(target, routeName, listener) {
        let afterMount    = target.afterMount
        let beforeUnmount = target.beforeUnmount

        target.afterMount = (component, el, setState) => {
            if (afterMount) afterMount(component, el, setState)

            if (listener) {
                listeners[component.id] = function (toState, fromState) {
                    let entity = app.entities[component.id]
                    listener(entity.context, app.setState(entity), toState, fromState)
                }
                router.addNodeListener(routeName, listeners[component.id])
            }

            if (target.canDeactivate) {
                components[component.id] = {
                    canDeactivate: (toState, fromState) => {
                        let entity = app.entities[component.id]
                        return target.canDeactivate(entity.context, app.setState(entity), toState, fromState)
                    }
                }
                router.registerComponent(routeName, components[component.id])
            }
        }

        target.beforeUnmount = (component, el) => {
            if (beforeUnmount) beforeUnmount(component, el)

            if (listeners[component.id]) {
                router.removeNodeListener(routeName, listeners[component.id])
                delete components[component.id]
            }

            if (components[component.id]) {
                router.deregisterComponent(routeName, components[component.id])
            }
        }

        return target
    }
}
