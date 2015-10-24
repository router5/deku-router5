import { element } from 'virtual-element';

const propTypes = {
    router:          {source: 'router'},
    route:           {source: 'route'},
    button:          {type: 'boolean'},
    routeName:       {type: 'string', optional: false},
    routeParams:     {type: 'object'},
    routeOptions:    {type: 'object'},
    activeClass:     {type: 'string'},
    activeStrict:    {type: 'function'},
    onClick:         {type: 'function'}
};

const defaultProps = {
    activeClass:  'active',
    button:       false,
    activeStrict: false,
    routeParams:  {},
    routeOptions: {}
};

const clickHandler =  (evt, component) => {
    evt.preventDefault()

    const { routeName, routeParams, routeOptions } = component.props;
    router.navigate(routeName, routeParams, routeOptions);
};

const render = ({ props }) => {
    const { button, activeClass, routeName, routeParams, children } = props;

    const active = router.isActive(routeName, routeParams);
    const href =  router.buildUrl(routeName, routeParams);

    const className = (props.class ? props.class.split(' ') : [])
        .concat(active ? [ activeClass ] : []).join(' ');

    const onClick = props.onClick || clickHandler;

    if (button) {
        return element('button', { type: 'button', 'class': className, onClick }, children);
    }

    return element('a', { href, 'class': className, onClick }, children)
};

export default { propTypes, defaultProps, render };
