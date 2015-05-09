'use strict';
import Jed from 'jed';
import { FluxMixin, StoreWatchMixin } from 'fluxxor';
import React from 'react/addons';

// Some globals   (>.<)  t(*_*)t
window.showError = console.error.bind(console);
window.i18n = new Jed({});
window.__ = window.iget = i18n.sprintf.bind(i18n);
window.React = React;
window.FluxMixin = FluxMixin(React);
window.createStoreWatchMixin = StoreWatchMixin;
window.nextTick = function(fn) {
    setTimeout(fn, 0);
};

