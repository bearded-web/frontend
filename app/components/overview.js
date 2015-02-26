import { Navigation } from 'react-router';
import { setCurrentProject } from '../actions/project.actions';

import Fa from './fa';

var flux = require('../flux');

var Header = require('./header'),
    Feed = require('./feed'),
    Ibox = require('./ibox'),
    IboxContent = require('./ibox-content'),
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


    getStateFromFlux: function() {
        return {
            $project: flux.store('Store').getState().currentProject
        };
    },

    render: function() {
        let { $project } = this.state;

        return (
            <div>
                <Header>
                    <Col>
                        <h2>Overview</h2>
                    </Col>
                </Header>
                <br/>
                <Row>
                    <Col md={8} mdOffset={2}>
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
