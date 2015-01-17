
var Router = require('react-router'),
    Link = require('react-router').Link,
    TargetNavLink = require('../target-nav-link'),
    AccountControls = require('../account-controls'),
    AddTargetButton = require('../add-target-button');


var LeftPanel = React.createClass({
    propTypes: {
        targets: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        show: React.PropTypes.bool
    },


    render: function() {
        var targetsStore = this.props.targets,
            targets = targetsStore.targets;

        var addingStateShow;

        if (targetsStore.targetAddInProcess) {
            addingStateShow = (
                <li className="text-center">Adding target...</li>
            );
        }

        var className = 'b-left-panel sidebar';
        if (this.props.show) {
            className += ' b-left-panel--opened';
        }

        return (
            <nav role="navigation" className={className}>
                <h1 className="b-left-panel--header">Barbudo</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <p className="text-center">
                                <Link to="/">
                                Overview
                                </Link>
                            </p>
                            <h3 className="b-left-panel--section-name">Targets</h3>
                            <ul className="list-unstyled b-left-panel--targets">
                                {targets.map(function(target) {
                                    return (
                                        <TargetNavLink  key={target.id} target={target} />
                                    );
                                })}

                                {addingStateShow}
                            </ul>
                            <div className="text-center">
                                <AddTargetButton />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="b-left-panel--bottom  text-center">
                    <AccountControls email={this.props.user.email}/>
                </div>
            </nav>
        );
    }
});

module.exports = LeftPanel;
