require('bootstrap.css');
require('font-awesome-webpack');

require('./styles/inspina/style.less');
require('./styles/dashboard.less');

var Jed = require('jed'),
    Fluxxor = require('fluxxor'),
    React = window.React = require('react'),
    Bootstrap = require('react-bootstrap'),
    pace = require('pace'),
    Router = require('react-router');


// Some globals   (>.<)  t(*_*)t
window.i18n = new Jed({});
window.__ = window.iget = i18n.gettext.bind(i18n);
window.React = React;
window.FluxMixin = Fluxxor.FluxMixin(React);
window.createStoreWatchMixin = Fluxxor.StoreWatchMixin;
window.Bootstrap = Bootstrap;
window.nextTick = function(fn) {
    setTimeout(fn, 0);
};

pace.start();

var actions = require('./actions'),
    stores = require('./stores'),
    flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

window.flux = flux;

var router = require('./router').create(flux);

flux.actions.app.initApp();

router.run(function(Handler, state) {
    // you might want to push the state of the router to a
    // store for whatever reason
    //RouterActions.routeChange({ routerState: state });
    React.render(<Handler flux={flux} />, document.body);
});
