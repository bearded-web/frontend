var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

var Page = React.createClass({
    statics: {
        willTransitionTo: function(transition) {
            if (flux.store('AppStore').isLogedIn) {
                console.log('redirect to /')
                transition.redirect('/');
            }
        }
    },

    render: function() {
        console.log('render page')
        return (
            <RouteHandler />
        );
    }
});

module.exports = Page;
