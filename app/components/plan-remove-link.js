'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { $Model } from '../lib/types';
import { remove } from '../actions/plan.actions';
import { bindAll } from 'lodash';

export default class PlanRemoveLink extends Component {
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
        remove(this.props.plan);
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

