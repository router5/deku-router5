export default segmentDecoratorFactory

function segmentDecoratorFactory(router) {
    let listeners = {}

    return function segmentDecorator(componentDef, routeName, listener) {
        componentDef.afterMount = (component, el, setState) => {
            function getListener(component) {
                listeners[component.id] = (toState, fromState) => {
                    listener(component, toState, fromState)
                }
                return isteners[component.id]
            }

            if (componentDef.afterMount) componentDef.afterMount(component, el, setState)

            if (listener) router.addNodeListener(routeName, this.nodeListener)

            router.registerComponent(routeName, component)
        }

        componentDef.beforeUnmount = (component, el) {
            if (componentDef.beforeUnmount) componentDef.beforeUnmount(component, el)

            if (listener) router.removeNodeListener(routeName, listeners[component.id])
            delete listeners[component.id]

            router.deregisterComponent(routeName, this)
        }

        return componentDef
    }
}
