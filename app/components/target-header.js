import { Component, PropTypes } from 'react';
import { ANDROID } from '../lib/target-types';
import flux from'../flux';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';

import { Col, Well, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import Fa from './fa';

const S = createStyle({
    h: { marginBottom: 0 }
});

export default class TargetHeader extends Component {
    static propTypes = {
        target: PropTypes.object.isRequired
    };

    @autobind
    removeTarget() {
        flux.actions.target.removeTarget(this.props.target);
    }

    render() {
        const { target } = this.props;
        const title = target.type === ANDROID ?
            target.android.name :
            target.web.domain;

        return <Row><Col xs={12}>
            <br/>
            <Well>
                <small className="pull-right">
                    <Link
                        className="btn btn-default btn-xs"
                        to="issues"
                        query={{ target: target.id }}>
                        Issues
                    </Link>
                    <span>&nbsp;</span>
                    <Link
                        className="btn btn-primary btn-xs"
                        to="new-scan"
                        params={{ targetId: target.id }}
                        query={{ project: target.project }}>
                        <Fa icon="plus" fw/>
                        Create scan
                    </Link>
                    <span>&nbsp;</span>
                    <a onClick={this.removeTarget} className="btn btn-danger btn-xs">
                        <Fa icon="remove" fw/>
                        Delete
                    </a>
                </small>
                <h3 style={S.h}>
                    {title}
                </h3>
            </Well>
        </Col></Row>;
    }
}
