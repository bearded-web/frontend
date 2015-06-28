/**
 * IssueControls
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import { Issue } from '../lib/types';
import { bindAll, capitalize } from 'lodash';
import { increaseSeverity, decreaseSeverity, toggleIssueStatus } from '../mutators/issueMutators';
import { icons } from '../lib/issue-controls-icons';
import { HIGH, INFO } from '../lib/severities';
import autobind from '../lib/autobind';
import { context } from '../lib/nf';

import { Button } from 'react-bootstrap';
import Fa from './fa';

const controls = Object.keys(icons);
const statusStyle = {
    marginBottom: '0.5rem'
};
const btnStyle = {
    minWidth: '120px'
};

@context({}, { increaseSeverity, decreaseSeverity, toggleIssueStatus })
export default class IssueControls extends Component {
    static propTypes = {
        issue: Issue
    };

    @autobind
    increase() {
        this.props.increaseSeverity(this.props.issue.id);
    }

    @autobind
    decrease() {
        this.props.decreaseSeverity(this.props.issue.id);
    }

    @autobind
    onStatusToggle(e, status) {
        e.stopPropagation();

        this.props.toggleIssueStatus(this.props.issue.id, status);
    }

    //region render
    render() {
        const { severity } = this.props.issue;

        return <div>
            <h3>
                {iget('Current severity')}: <strong>{severity}</strong>
            </h3>
            <Button
                bsStyle="warning"
                ref="increase"
                bsSize="small"
                disabled={severity === HIGH}
                onClick={this.increase}>
                <Fa icon="plus" fw/>
                {iget('Increase')}
            </Button>
            &nbsp;
            <Button
                ref="decrease"
                bsStyle="info"
                bsSize="small"
                disabled={severity === INFO}
                onClick={this.decrease}>
                <Fa icon="minus" fw/>
                {iget('Decrease')}
            </Button>
            <hr/>

            {controls.map(this.renderControl)}
        </div>;
    }

    @autobind
    renderControl(status) {
        const active = !!this.props.issue[status];
        const title = iget(capitalize(status));
        const handler = e => this.onStatusToggle(e, status);
        const type = active ? 'primary' : 'default';

        return <div style={statusStyle} key={status}>
            <Button bsStyle={type}
                    ref={status}
                    onClick={handler}
                    bsSize="small"
                    style={btnStyle}
                    active={active}>

                <Fa icon={icons[status]} fw/>
                {iget(title)}
            </Button>
        </div>;
    }

    //endregion
}
