'use strict';

import { Navigation } from 'react-router';
import { setCurrentProject } from '../actions/project.actions';
import setTitle from '../lib/set-title';

import Fa from './fa';
import Members from './project-members';
import Ibox, { IboxContent, IboxTitle } from './ibox';

var flux = require('../flux');

var Header = require('./header'),
    Feed = require('./feed'),
    { Row, Col } = require('react-bootstrap');

var Overview = React.createClass({
    mixins: [
        FluxMixin,
        Navigation,
        flux.createStoreWatchMixin('Store')
    ],


    statics: {
        willTransitionTo: function(transition, params, query) {

        }
    },

    componentDidMount() {
        setTitle(iget('Dashboard'));
    },


    getStateFromFlux: function() {
        return {
            $project: flux.store('Store').getState().currentProject
        };
    },

    render: function() {
        let { $project } = this.state;

        if (!$project) {
            return <h1>Project loading</h1>;
        }

        return (
            <div>
                <Header>
                    <Col>
                        <h2>Overview</h2>
                    </Col>
                </Header>
                <br/>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Col md={6}>
                                <Ibox>
                                    <IboxTitle>{__('Members')}</IboxTitle>
                                    <IboxContent>
                                        <Members project={$project} extended/>
                                    </IboxContent>
                                </Ibox>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Ibox>
                            <IboxContent>
                                {
                                    $project ?
                                        <Feed source={$project.toJS()} type="project"/> :
                                        <Fa icon="spiner" size="4x" spin/>
                                }
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = Overview;
