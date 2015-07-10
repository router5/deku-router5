let routerPlugin = (router) => {

    return (app) => {
        app.set('currentRoute', router.getState())

        router.addListener((toState) => {
            app.set('currentRoute', toState)
        })
    }
}

export default routerPlugin
