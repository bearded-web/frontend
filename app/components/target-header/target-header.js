'use strict';

import { WEB, ANDROID } from '../../lib/target-types';
import flux from'../../flux';

import { Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Header from '../header';
import Fa from '../fa';

var TargetHeader = React.createClass({
    propTypes: {
        target: React.PropTypes.object.isRequired
    },


    removeTarget: function() {
        flux.actions.target.removeTarget(this.props.target);
    },


    render: function() {
        const { target } = this.props;
        const title = target.type === ANDROID ?
            target.android.name :
            target.web.domain;


        return (
            <Header>
                <Col xs={12}>
                    <h2>
                        <span className="c-target-header--title">
                            {title}
                        </span>
                        <small className="pull-right c-target-header--controls">
                            <Link
                                to="issues"
                                query={{ target: target.id }}>
                                Issues
                            </Link>
                            <span>&nbsp;</span>
                            <Link
                                to="new-scan"
                                params={{ targetId: target.id }}
                                query={{ project: target.project }}>
                                <Fa icon="plus" fw/>
                                Create scan
                            </Link>
                            <span>&nbsp;</span>
                            <a onClick={this.removeTarget}>
                                <Fa icon="remove" fw/>
                                Delete
                            </a>
                        </small>
                    </h2>
                </Col>
            </Header>
        );
    }
});

module.exports = TargetHeader;
