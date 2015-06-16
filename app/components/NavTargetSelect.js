/**
 * NavProjectSelect
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf } from 'react-immutable-proptypes';
import connectToStores from '../lib/connectToStores';
import targetsStore from '../stores/targetsStore';
import autobind from '../lib/autobind';
import { Model, Target } from '../lib/types';
import { startsWith } from 'lodash';
import { ANDROID } from '../lib/target-types';
import { Map } from 'immutable';


import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import Fa from './fa';

const getState = ({ project }) => {
    const pid = project.get('id');

    return ({
        targets: targetsStore
            .getRawState()
            .toList()
            .filter(target => target.get('project') === pid)
    });
};

@connectToStores([targetsStore], getState)
export default class NavTargetSelect extends Component {
    static propTypes = {
        project: Model,
        target: Target,
        targets: listOf(Model)
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    goToOverview() {
        const { target } = this.props;
        if (target) {
            this.context.router.transitionTo('target', {
                targetId: target.id
            });
        }
    }

    @autobind
    goToAdd() {
        this.context.router.transitionTo('target-create');
    }

    render() {
        const { targets, target } = this.props;
        const title = this.renderNavButton();

        return <DropdownButton navItem eventKey={3} title={title}>
            {target && <MenuItem onSelect={this.goToOverview}>
                {iget('Overview')}
            </MenuItem>}
            {target && <MenuItem divider/>}
            {targets.toArray().map(this.renderTargetLink)}
            {targets.size ? <MenuItem divider/> : ''}
            <MenuItem onSelect={this.goToAdd}>
                {iget('Add target')}
            </MenuItem>
        </DropdownButton>;
    }

    @autobind
    renderTargetLink(target, i) {
        const { id } = target.toJS();
        const handler = () => {
            this.context.router.transitionTo('target', { targetId: id });

        };

        return <MenuItem onSelect={handler} eventKey={i} key={id}>
            {this.renderTargetLabel(target)}
        </MenuItem>;
    }

    renderTargetLabel(target) {
        //TODO remove hack
        target = Map.isMap(target) ? target.toJS() : target;
        let isHttps = false;

        let title = target.type === ANDROID ?
            target.android.name :
            target.web.domain;

        if (startsWith(title, 'http://')) {
            title = title.slice(7);
        }

        if (startsWith(title, 'https://')) {
            title = title.slice(8);
            isHttps = true;
        }

        const icon = target.type === ANDROID ?
            'android' :
            isHttps ? 'lock' : 'globe';

        return <span>
            <Fa icon={icon}/>
            &nbsp;
            {title}
            {this.renderIssuesLabel(target)}
            &nbsp;
        </span>;
    }

    renderIssuesLabel(target) {
        const { issues } = target.summaryReport || { issues: {} };

        let count = 0;
        let labelStyle;

        if (issues.low) {
            count = issues.low;
            labelStyle = 'info';
        }

        if (issues.medium) {
            count = issues.medium;
            labelStyle = 'warning';
        }

        if (issues.high) {
            count = issues.high;
            labelStyle = 'danger';
        }

        if (!count) return '';

        const style = {
            marginLeft: '0.3rem',
            marginTop: '0.35rem'
        };

        return <Label bsStyle={labelStyle} style={style}>{count}</Label>;
    }

    renderNavButton() {
        const { target } = this.props;

        if (!target) {
            return iget('Select target');
        }

        return this.renderTargetLabel(target);
    }
}

