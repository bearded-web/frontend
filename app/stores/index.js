var Stores = {
    TargetsStore: require('./targets.store'),
    AgentsStore: require('./agents.store'),
    ScanStore: require('./scan.store'),
    ToastStore: require('./toast.store'),
    TargetStore: require('./target.store'),
    FeedStore: require('./feed.store'),
    AppStore: require('./app.store')
};


Object.keys(Stores).forEach(function(type) {
    Stores[type] = new Stores[type]();
});
module.exports = Stores;
