/**
 * IssueControls
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import { Severity } from '../lib/types';
import { greenColor } from '../style';
import { bindAll, capitalize, defaults } from 'lodash';
import { increaseSeverity, decreaseSeverity, toggleStatus } from '../actions/issues.actions';
import { icons } from '../lib/issue-controls-icons';
import { HIGH, LOW } from '../lib/severities';

import { Button } from 'react-bootstrap';
import Fa from './fa';

const controls = Object.keys(icons);
const statusStyle = {
    marginBottom: '0.5rem'
};

export default class IssueControls extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'increase',
            'decrease',
            'renderControl'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region handlers

    increase() {
        increaseSeverity(this.props.issue);
    }

    decrease() {
        decreaseSeverity(this.props.issue);
    }

    onStatusToggle(e, status) {
        e.stopPropagation();

        toggleStatus(this.props.issue, status);
    }

    //endregion handlers


    //region render
    render() {
        const { severity } = this.props.issue.toObject();

        return <div>
            <h3>
                {iget('Current severity')}: <strong>{severity}</strong>
            </h3>
            <Button bsStyle="warning"
                    bsSize="small"
                    disabled={severity === HIGH}
                    onClick={this.increase}>
                <Fa icon="plus" fw/>
                {iget('Increase')}
            </Button>
            &nbsp;
            <Button bsStyle="info"
                    bsSize="small"
                    disabled={severity === LOW}
                    onClick={this.decrease}>
                <Fa icon="minus" fw/>
                {iget('Decrease')}
            </Button>
            <hr/>

            {controls.map(this.renderControl)}
        </div>;
    }

    renderControl(status) {
        const active = this.props.issue.get(status);
        const title = iget(capitalize(status));
        const handler = e => this.onStatusToggle(e, status);
        const type = active ? 'primary' : 'default';

        return <div style={statusStyle}>
            <Button bsStyle={type}
                    onClick={handler}
                    bsSize="small"
                    active={active}>

                <Fa icon={icons[status]} fw/>
                {iget(title)}
            </Button>
        </div>;
    }

    //endregion
}

const field = PropTypes.bool.isRequired;
IssueControls.propTypes = {
    issue: shape({
        severity: Severity,
        confirmed: field,
        false: field,
        muted: field,
        resolved: field
    }).isRequired
};
