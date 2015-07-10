export default segmentDecoratorFactory

function segmentDecoratorFactory(router) {
    let listeners = {}

    return function SegmentDecorator(componentDef, routeName, listener) {
        let nodeListener = (comp) => {
            listeners[comp.id] = (toState, fromState) => {
                listener(comp, toState, fromState)
            }
            return listeners[comp.id]
        }

        componentDef.afterMount = (component, el, setState) => {
            if (componentDef.afterMount) componentDef.afterMount(component, el, setState)

            if (listener) router.addNodeListener(routeName, nodeListener(component))

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
