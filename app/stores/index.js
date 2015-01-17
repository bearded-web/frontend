var TargetsStore = require('./targets.store'),
    AppStore = require('./app.store');

module.exports = {
    TargetsStore: new TargetsStore(),
    AppStore: new AppStore()
};
