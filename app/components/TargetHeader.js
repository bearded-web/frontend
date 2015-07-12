/**
 * TargetHeader
 */

import { PropTypes, Component } from 'react';
import { ANDROID } from '../lib/target-types';
import { create as createStyle } from 'react-style';
import { Target } from '../lib/types';
import { deleteTarget } from '../mutators/targetMutators';
import { context } from '../lib/nf';

import { Row, Col, Well } from 'react-bootstrap';
import { Link } from 'react-router';
import Fa from './fa';

const S = createStyle({
    h: { marginBottom: 0 }
});

@context({}, { deleteTarget })
export default class TargetHeader extends Component {
    static propTypes = {
        deleteTarget: PropTypes.func.isRequired,
        target: Target
    };

    removeTarget = () => {
        this.props.deleteTarget(this.props.target.id);
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
                    <a ref="delete"
                        onClick={this.removeTarget}
                        className="btn btn-danger btn-xs">
                        <Fa icon="remove" fw/>
                        Delete
                    </a>
                </small>
                <h3 ref="title" style={S.h}>
                    {title}
                </h3>
            </Well>
        </Col></Row>;
    }
}
