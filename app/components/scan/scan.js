var React = require('react'),
    Router = require('react-router'),
    _ = require('lodash');

var { Row, Col, Input, Jumbotron } = require('react-bootstrap'),
    Domify = require('react-domify'),
    Ibox = require('../ibox'),
    IboxContent = require('../ibox-content'),
    StartScanButton = require('../start-scan-button');

var Scan = React.createClass({
    mixins: [
        Router.State,
        FluxMixin,
        createStoreWatchMixin('ScanStore')
    ],

    getStateFromFlux: function() {
        var state = flux.store('ScanStore').getState(),
            oldState = this.state || {};

        state.selectedPlan = oldState.selectedPlan || state.plans[0];

        return state;
    },

    createScan: function() {
        var targetId = this.getParams().targetId,
            projectId = this.getQuery().project,
            planId = this.state.selectedPlan.id;

        flux.actions.scan.createScan(targetId, projectId, planId);
    },

    onPlanChange: function(event) {
        this.setState({
            selectedPlan: _.find(this.state.plans, {id: event.target.value}, this)
        });
    },

    render: function() {
        var { selectedPlan } = this.state;

        return (
            <div className="c-scan">
                <br/>
                <br/>
                <Row>
                    <Col sm={8} md={6}>
                        {this.renderForm()}
                        <Jumbotron>
                            <h3>{iget('Plan data')}</h3>
                            <Domify value={selectedPlan}/>
                        </Jumbotron>
                    </Col>
                    <Col sm={4} md={6}>
                        <Ibox>
                            <IboxContent>
                                <StartScanButton text={iget('Create scan')} onClick={this.createScan}/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>
            </div>
        );
    },

    renderForm: function() {
        var { selectedPlan, plans } = this.state;

        if (!plans.length) {
            return (
                <div>{iget('Loading...')}</div>
            );
        }

        return (
            <form>
                <Input type="select" defaultValue={selectedPlan.id} onChange={this.onPlanChange} label={iget('Select plan')}>
                    {this.state.plans.map(function(plan) {
                        return (
                            <option key={plan.id} value={plan.id}>
                                {plan.name}
                            </option>
                        );
                    })}
                </Input>
            </form>
        );
    }
});

module.exports = Scan;
