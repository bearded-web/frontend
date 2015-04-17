'use strict';
var Stores = {
    TargetsStore: require('./targets.store'),
    Store: require('./store'),
    AgentsStore: require('./agents.store'),
    PlansStore: require('./plans.store'),
    PluginsStore: require('./plugins.store'),
    WorkflowStore: require('./workflow.store'),
    ScanStore: require('./scan.store'),
    ToastStore: require('./toast.store'),
    TargetStore: require('./target.store'),
    ReportStore: require('./report.store'),
    FeedStore: require('./feed.store'),
    AppStore: require('./app.store')
};


Object.keys(Stores).forEach(function(type) {
    Stores[type] = new Stores[type]();
});
module.exports = Stores;
