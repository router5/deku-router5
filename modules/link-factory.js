import {element} from 'deku'

// Use of a factory rather than source as having nested routers
// are not excluded
export default linkFactory

var listeners = {}

function linkFactory(router) {
    let propTypes = {
        label:           {type: 'string', optional: false},
        button:          {type: 'boolean'},
        routeName:       {type: 'string', optional: false},
        routeParams:     {type: 'object'},
        routeOptions:    {type: 'object'},
        activeClassName: {type: 'string'},
        activeStrict:    {type: 'function'},
        onClick:         {type: 'function'}
    }

    let defaultProps = {
        activeClassName: 'active',
        button:          false,
        activeStrict:    false,
        routeParams:     {},
        routeOptions:    {}
    }

    let initialState = (props) {
        return {
            active: router.isActive(props.routeName, props.routeParams, props.activeStrict)
        };
    }

    // Is it overkill?
    let shouldUpdate = (component, nextProps, nextState) => {
        let {state, props} = component

        return !router.areStatesEqual(
            {name: nextProps.routeName,  params: nextProps.routeParams},
            {name: props.routeName, params: props.routeParams}
        ) || state.active !== nextState.active;
    }

    let render = (component) => {
        let {props,state} = component

    }

    let clickHandler =  (evt, component, updateState) => {
        evt.preventDefault()

        let {props} = component
        router.navigate(props.routeName, props.routeParams, props.routeOptions)
    }

    let afterMount = (component, el, setState) => {
        listeners[component.id] = () => {
            let {props} = component.props
            setState({active: router.isActive(props.routeName, props.routeParams)})
        }

        router.addListener(listeners[component.id])
    }

    let beforeUnmout = (component, el) => {
        router.removeListener(listeners[component.id])
        delete listeners[component.id]
    }

    let render = (component, el) => {
        let {props, state} = component
        let href =  router.buildUrl(props.routeName, props.routeParams)
        let className = (props.className ? props.className.split(' ') : [])
            .concat(state.active ? [props.activeClassName] : []).join(' ')
        let onClick = props.onClick || clickHandler

        if (button) {
            return element('button', {type: 'button', className, onClick}, [props.label])
        }
        return element('a', {href, className, onClick}, [props.label])
    }

    return {propTypes, defaultProps, initialState, shouldUpdate, afterMount, beforeUnmout, render}
}
