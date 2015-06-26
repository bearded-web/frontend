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

import TargetLabel from './TargetLabel';
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

        return <DropdownButton navItem eventKey={3} title={target ? '' : iget('Select target')}>
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
            <TargetLabel target={target.toJS()}/>
        </MenuItem>;
    }
}
