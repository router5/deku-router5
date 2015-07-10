import {element} from 'deku'

// Use of a factory rather than source as having nested routers
// are not excluded
export default linkFactory


function linkFactory(router) {
    let propTypes = {
        currentRoute:    {source: 'currentRoute'},
        button:          {type: 'boolean'},
        routeName:       {type: 'string', optional: false},
        routeParams:     {type: 'object'},
        routeOptions:    {type: 'object'},
        activeClass:     {type: 'string'},
        activeStrict:    {type: 'function'},
        onClick:         {type: 'function'}
    }

    let defaultProps = {
        activeClass:  'active',
        button:       false,
        activeStrict: false,
        routeParams:  {},
        routeOptions: {}
    }

    let clickHandler =  (evt, component, updateState) => {
        evt.preventDefault()

        let {props} = component
        router.navigate(props.routeName, props.routeParams, props.routeOptions)
    }

    let render = (component, el) => {
        let {props} = component
        let active = router.isActive(props.routeName, props.routeParams)
        let href =  router.buildUrl(props.routeName, props.routeParams)
        let className = (props.class ? props.class.split(' ') : [])
            .concat(active ? [props.activeClass] : []).join(' ')

        let onClick = props.onClick || clickHandler

        if (props.button) {
            return element('button', {type: 'button', 'class': className, onClick}, props.children)
        }
        return element('a', {href, 'class': className, onClick}, props.children)
    }

    return {propTypes, defaultProps, render}
}
