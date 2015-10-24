import element from 'virtual-element';

function routeNode(nodeName) {
    return function routeNodeWrapper(RouteSegment) {
        const propTypes = {
            router: {source: 'router'}
        };

        const initialState = props => ({ route: props.router.getState(), previousRoute: null });

        const afterMount = (component, elm, setState) => {
            component.props.router.addNodeListener(nodeName, (toState, fromState) => {
                setState({ route: toState, previousRoute: fromState });
            });
        };

        const render = (component) => {
            return element(RouteSegment, { ...component.props, ...component.state });
        };

        return { propTypes, afterMount, render };
    };
}

export default routeNode;
