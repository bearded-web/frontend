import { createClass } from 'react';
import flux from '../../flux';
import setTitle from '../../lib/set-title';
import authStore from '../../stores/auth.store';
import { fromJS } from 'immutable';
import { FluxMixin } from 'fluxxor';
import { create as createStyle } from 'react-style';

import { Row, Col, Button } from 'react-bootstrap';
import Router, { Link } from 'react-router';
import Ibox, { IboxContent, IboxTitle } from '../ibox';
import TargetComments from '../TargetComments';
import SeverityWidget from '../SeverityWidget';
import TargetHeader from '../TargetHeader';
import Feed from '../FeedFlow';
import Fa from '../fa';
import StartScanButton from '../start-scan-button';
import TargetScan from '../target-scan';
import TargetTechs from '../TargetTechs';
import TargetIssuesLifetimeGraph from '../TargetIssuesLifetimeGraph';

const S = createStyle({
    noPadding: { padding: 0 }
});

var Target = createClass({
    mixins: [
        Router.Navigation,
        FluxMixin(React),
        createStoreWatchMixin('TargetStore')
    ],

    statics: {
        willTransitionTo: function(transition, params, query) {
            flux.actions.target.setCurrentTarget(params.targetId);
        },
        willTransitionFrom: function() {
            flux.actions.target.unsetCurrentTarget();
        }
    },

    getInitialState() {
        return { isAdmin: authStore.getRawState().getIn(['user', 'admin']) };
    },

    componentDidMount() {
        const { target, loading } = this.state;

        let title = iget('Target');

        if (!loading && target) {
            title = target.web.domain;
        }

        authStore.onChange(this.onAuthChange);

        setTitle(title);
    },

    componentWillUnmount(){
        authStore.offChange(this.onAuthChange);
    },

    onAuthChange() {
        this.setState({ isAdmin: authStore.getRawState().getIn(['user', 'admin']) });
    },

    getStateFromFlux() {
        return flux.store('TargetStore').getState();
    },

    onTotalsClick() {
        const target = this.state.target.id;

        this.context.router.transitionTo('issues', {}, { target });
    },

    render: function() {
        const { target, loading, isAdmin } = this.state;

        if (loading || !target) {
            return <div className="c-target">
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">
                            {loading ? 'Loading' : iget('No target Found')}
                        </h1>
                    </Col>
                </Row>
            </div>;
        }

        let issues = target.summaryReport && target.summaryReport.issues;
        issues = issues || {};

        return (
            <div className="c-target">
                <TargetHeader target={target}/>
                <br/>
                <Row>
                    <Col xs={12} md={6}>
                        <Row style={{marginTop: '-10px'}}>
                            <Link to="issues" query={{target: target.id}}>
                                <Col xs={4}><SeverityWidget severity="high" count={issues.high}/></Col>
                                <Col xs={4}><SeverityWidget severity="medium" count={issues.medium}/></Col>
                                <Col xs={4}><SeverityWidget severity="low" count={issues.low}/></Col>
                            </Link>
                        </Row>

                        <Ibox><IboxTitle>
                            <h5>{iget('Technologies')}</h5>
                        </IboxTitle><IboxContent>
                            <TargetTechs target={target}/>
                        </IboxContent></Ibox>

                        <Ibox><IboxTitle>
                            <h5>{iget('Issues timeline')}</h5>
                        </IboxTitle><IboxContent style={S.noPadding}>
                            <TargetIssuesLifetimeGraph targetId={target.id}/>
                        </IboxContent></Ibox>

                        <Ibox>
                            <IboxTitle><h5>{iget('Comments')}</h5></IboxTitle>
                            <IboxContent >
                                <TargetComments target={target}/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                    <Col xs={12} md={6}>
                        {isAdmin && <Ibox><IboxTitle>
                            <h5>{iget('Actions')}</h5>
                        </IboxTitle><IboxContent style={{minHeight: '100px'}}>
                            <Link className="btn btn-primary" to="issue-create" query={{target: target.id}}>
                                {iget('Add issue')}
                            </Link>
                        </IboxContent></Ibox>}
                        <Ibox>
                            <IboxTitle>
                                <h5>{iget('Target timeline')}</h5>
                            </IboxTitle>
                            <IboxContent>
                                <Feed source={target} type="target"/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>

            </div>
        );
    },

    renderStartScanButton: function() {
        var { target, detectPlan } = this.state,
            targetId = target.id,
            projectId = target.project,
            planId = detectPlan.id;

        return <StartScanButton
            project={projectId}
            target={targetId}
            plan={planId}/>;
    }
});

module.exports = Target;

if (module.hot) {
    module.hot.accept([
        '../TargetComments'
    ], function() {
        //TODO flux add actions
    });
}
