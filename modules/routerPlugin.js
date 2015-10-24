const routerPlugin = router => app => {
    app.set('currentRoute', router.getState());
    router.addListener(toState => app.set('route', toState));
};

export default routerPlugin;
