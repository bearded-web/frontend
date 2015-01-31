var flux = require('../flux');

var Header = require('./header'),
    Feed = require('./feed'),
    Ibox = require('./ibox'),
    IboxContent = require('./ibox-content'),
    { Row, Col } = require('react-bootstrap');

var Overview = React.createClass({
    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('AppStore')
    ],

    getStateFromFlux: function() {
        return {
            project: flux.store('AppStore').getProject()
        };
    },

    render: function() {
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
                                <Feed source={this.state.project} type="project"/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = Overview;
