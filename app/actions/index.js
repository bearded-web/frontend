module.exports = {
    target: require('./target.actions'),
    scan: require('./scan.actions'),
    plan: require('./plan.actions'),
    toast: require('./toast.actions'),
    agent: require('./agent.actions'),
    app: require('./app.actions')
};

if (module.hot) {
    module.hot.accept([
        './plan.actions'
    ], function() {

    });
}