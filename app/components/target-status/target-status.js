'use strict';

import React, { PropTypes, addons } from'react/addons';
import keys from 'lodash';

import { Row, Col } from 'react-bootstrap';
import ReportIssuesTotal from '../report-issues-total';

let { PureRenderMixin } = addons,
    { number } = PropTypes,
    severities = ['high', 'medium', 'low'];

export default React.createClass({
    mixins: [PureRenderMixin],

    PropTypes: {
        high: number,
        medium: number,
        low: number
    },

    getDefaultProps() {
        return {
            high: 0,
            medium: 0,
            low: 0
        };
    },

    render() {
        return <div className="target-status">
            <Row>
                <Col xs={12}>
                    {severities.map(this.renderCount)}
                </Col>
            </Row>
        </div>;
    },

    renderCount(severity, i) {
        let count = this.props[severity];

        return <ReportIssuesTotal key={i} short severity={severity} count={count} />;
    }
});
