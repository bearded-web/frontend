'use strict';
var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

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
