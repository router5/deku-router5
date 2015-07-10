# router5-deku
Helpers for using router5 (HTML5 router) with Deku

- See [router5.github.io](http://router5.github.io) for more info about router5
- Example available [here](http://router5.github.io/docs/with-deku.html)

### Installation:

```sh
// Bower
bower install router5-deku --save
// npm
npm install router5-deku --save-dev
```

It includes:

- A router plugin which sets and update environment data (source) `currentRoute`
- A link factory to create a `Link` function (for hyperlinks and buttons)
- A decorator factory to create a `SegmentDecorator` decorator (add a node listener for the specified route, and register component
with router when active)


The use of factories is to be able to access `app` and `router` objects easily:

```javascript
import {Router5} from 'router5'
import {routerPlugin, linkFactory, segmentDecoratorFactory} from 'router5-deku'

var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',            '/inbox')
    .addNode('inbox.message',    '/message/:id')
    .addNode('compose',          '/compose')
    .addNode('contacts',         '/contacts')
    .start()

var Link = linkFactory(router)

var app = tree().use(routerPlugin(router))

var SegmentDecorator = segmentDecoratorFactory(router, app)

export {app, router, Link, SegmentDecorator}
```

### Router plugin

Simply use it with _app.use_: `app.use(routerPlugin(router))`

### Segment decorator

In the absence of mixins, the segment decorator will mutate a component definition to enhance its `afterMount` and `beforeUnmount` functions
(already defined functions will be preserved).

`SegmentDecorator(component, routeName[, listener])`:

```javascript
var RootComponent = {
    initialState: function (props) {
        return {
            currentRoute: router.getState()
        };
    },

    render: function (component) {
        var currentRoute = component.state.currentRoute;
        return element('div', {}, currentRoute ? currentRoute.name : 'Not found');
    }
};
SegmentDecorator(RootComponent, '', function (component, setState, toRoute, fromRoute) {
    setState({currentRoute: toRoute})
});
```

### Link

You can specify _button_ (default to false, whether it should render a hyperlink or button), _routeName_ (required), _routeParams_, _routeOptions_
and _activeClass_.

```javascript
function render() {
    return <Link routeName="inbox" routeOptions={reload: true}>Go to Inbox</Link>
}
```


