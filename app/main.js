require('bootstrap.css');
require('font-awesome-webpack');

require('./styles/inspina/style.less');
require('./styles/dashboard.less');

var Jed = require('jed'),
    jQuery = require('jquery'),
    Fluxxor = require('fluxxor'),
    React = window.React = require('react'),
    Bootstrap = require('react-bootstrap'),
    pace = require('pace'),
    Router = require('react-router');


// Some globals   (>.<)  t(*_*)t
window.jQuery = jQuery; // only for toastr
window.i18n = new Jed({});
window.__ = window.iget = i18n.sprintf.bind(i18n);
window.React = React;
window.FluxMixin = Fluxxor.FluxMixin(React);
window.createStoreWatchMixin = Fluxxor.StoreWatchMixin;
window.Bootstrap = Bootstrap;
window.nextTick = function(fn) {
    setTimeout(fn, 0);
};

pace.start();

var flux = window.flux = require('./flux');

flux.actions.app.initApp();

var router = require('./router').create();

router.run(function(Handler, state) {
    // you might want to push the state of the router to a
    // store for whatever reason
    //RouterActions.routeChange({ routerState: state });
    React.render(<Handler flux={flux} />, document.body);
});
