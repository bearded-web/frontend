var Stores = {
    TargetsStore: require('./targets.store'),
    ScanStore: require('./scan.store'),
    TargetStore: require('./target.store'),
    AppStore: require('./app.store')
};

Object.keys(Stores).forEach(function(type) {
    Stores[type] = new Stores[type]();
});
module.exports = Stores;
