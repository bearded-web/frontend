"use strict";

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Model, $Models } from '../lib/types';
import { Map } from 'immutable';

import RemoveLink from './remove-link';
import StepForm from './step-form';
import { Input } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        $step: PropTypes.instanceOf(Map).isRequired,
        $plugins: $Models,
        onChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired
    },

    onPluginChange(pluginName) {
        let $step = this.props.$step.set('plugin', pluginName);

        this.props.onChange($step);
    },

    onFormChange($step) {
        this.props.onChange(this.props.$step.merge($step));
    },

    onNameChange(event) {
        this.props.onChange(
            this.props.$step.set('name', event.target.value));
    },

    onDescChange(event) {
        this.props.onChange(
            this.props.$step.set('desc', event.target.value));
    },

    onRemove(e) {
        e.preventDefault();

        this.props.onRemove();
    },

    render() {
        let { $plugins, $step } = this.props;
        let { name, desc, plugin } = $step.toJS();
        let combineName = $pl => $pl.get('name') + ':' + $pl.get('version');
        let $plugin = $plugins.find($pl => combineName($pl) === plugin);

        if (!$plugin) {
            return <span>No plugin</span>;
        }

        let pluginName = `${$plugin.get('name')}, version: ${$plugin.get('version')}`;

        return <div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">{iget('Plugin')}</label>

                    <p className="form-control-static col-sm-9">
                        {pluginName}
                    </p>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">{iget('Name')}</label>

                    <div className="col-sm-9">
                        <input type="text"
                               ref="name"
                               value={name}
                               onChange={this.onNameChange}
                               className="form-control"
                               placeholder={iget('Name')}/>
                    </div>

                    <div className="col-sm-1">
                        <RemoveLink onClick={this.onRemove}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">{iget('Description')}</label>

                    <div className="col-sm-9">
                        <textarea ref="decs"
                                  value={desc}
                                  onChange={this.onDescChange}
                                  className="form-control"
                                  placeholder={iget('Description')}/>
                    </div>
                </div>
            </form>

            <StepForm step={$step} plugin={$plugin} onChange={this.onFormChange}/>
        </div>;
    }
});



