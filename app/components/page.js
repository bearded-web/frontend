'use strict';

import { RouteHandler } from 'react-router';

var Page = React.createClass({
    statics: {
        willTransitionTo: function(transition) {
            if (flux.store('AppStore').isLogedIn) {
                transition.redirect('/');
            }
        }
    },

    render: function() {
        return (
            <RouteHandler />
        );
    }
});

module.exports = Page;
