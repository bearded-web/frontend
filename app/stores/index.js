var TargetsStore = require('./targets.store'),
    TargetStore = require('./target.store'),
    AppStore = require('./app.store');

module.exports = {
    TargetsStore: new TargetsStore(),
    AppStore: new AppStore(),
    TargetStore: new TargetStore()
};
