import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { $Model } from '../lib/types';
import { remove } from '../actions/plan.actions';
import { bindAll } from 'lodash';
import { context } from '../lib/nf';
import { deletePlan } from '../mutators/planMutators';

@context({}, { deletePlan })
export default class PlanRemoveLink extends Component {
    static propTypes = {
        deletePlan: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'toggle',
            'onDeleteClick'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
        this.state = { opened: false };
    }

    toggle() {
        this.setState({ opened: !this.state.opened });
    }

    onDeleteClick() {
        this.props.deletePlan(this.props.plan.get('id'));
    }

    render() {
        let { opened } = this.state;

        if (!opened) {
            return <a {...this.props} onClick={this.toggle}>
                Remove
            </a>;
        }

        return <div {...this.props}>
            <a onClick={this.onDeleteClick}>Yes</a>
            &nbsp;
            &nbsp;
            <a onClick={this.toggle}>No</a>
        </div>;
    }
}

PlanRemoveLink.propTypes = {
    plan: $Model
};
