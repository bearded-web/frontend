'use strict';
var Stores = {
    TargetsStore: require('./targets.store'),
    Store: require('./store'),
    PlansStore: require('./plans.store'),
    PluginsStore: require('./plugins.store'),
    WorkflowStore: require('./workflow.store'),
    ScanStore: require('./scan.store'),
    TargetStore: require('./target.store'),
    ReportStore: require('./report.store'),
    AppStore: require('./app.store')
};


Object.keys(Stores).forEach(function(type) {
    Stores[type] = new Stores[type]();
});
module.exports = Stores;
