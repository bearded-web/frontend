/**
 * NavProjectSelect
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import autobind from '../lib/autobind';
import { Project } from '../lib/types';
import { context } from '../lib/nf';
import { values } from 'lodash';

import TargetLabel from './TargetLabel';
import { DropdownButton, MenuItem, SplitButton } from 'react-bootstrap';

const cursors = { targets: ['targets'] };

@context({ cursors })
export default class NavTargetSelect extends Component {
    static propTypes = {
        project: Project,
        targetId: PropTypes.string,
        targets: PropTypes.object.isRequired
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    goToOverview() {
        const target = this.getTarget();
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
        const { project, targets } = this.props;
        const target = this.getTarget();
        let title = iget('Select target');
        if (target) {
            title = <TargetLabel target={target}/>;
        }

        const BtnComponent = target ? SplitButton : DropdownButton;
        const projectId = project.id;
        const list = values(targets).filter(t => t.project === projectId);

        return <BtnComponent
            bsStyle="default"
            title={title}
            className="btn-white"
            onClick={this.goToOverview}>
            {list.map(this.renderTargetLink)}
            {list.length ? <MenuItem divider/> : ''}
            <MenuItem onSelect={this.goToAdd}>
                {iget('Add target')}
            </MenuItem>
        </BtnComponent>;
    }

    @autobind
    renderTargetLink(target, i) {
        const { id } = target;
        const handler = () => {
            this.context.router.transitionTo('target', { targetId: id });
        };

        return <MenuItem onSelect={handler} eventKey={i} key={id}>
            <TargetLabel target={target}/>
        </MenuItem>;
    }

    getTarget() {
        return this.props.targets[this.props.targetId];
    }
}
