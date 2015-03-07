"use strict";

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Models } from '../lib/types';
import { changeWorkflow, addStep } from '../actions/plan.actions';

import Fa from './fa';
import Step from './workflow-step';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        $steps: $Models,
        $plugins: $Models
    },

    onStepChange(position, $step) {
        let { $steps } = this.props;

        $steps = $steps.set(position, $step);

        changeWorkflow($steps);
    },

    onAddStep() {
        addStep();
    },

    onRemove(position) {
        changeWorkflow(this.props.$steps.remove(position));
    },

    render() {
        let { $steps } = this.props;

        return <div>
            <ul className="list-group">
                {$steps.toArray().map(this.renderStep)}

                <li className="list-group-item">
                    <button onClick={this.onAddStep}
                            type="button"
                            className="btn btn-block btn-outline btn-primary">
                        <Fa icon="plus"/>
                        &nbsp;
                        {iget('Add step')}
                    </button>
                </li>
            </ul>
        </div>
    },

    renderStep($step, i) {
        let { $plugins } = this.props,
            handler = this.onStepChange.bind(this, i),
            onRemove = this.onRemove.bind(this, i);


        return <li className="list-group-item" key={i}>
            <Step $step={$step}
                  $plugins={$plugins}
                  onChange={handler}
                  onRemove={onRemove}/>
        </li>
    }
});

