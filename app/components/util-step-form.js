'use strict';

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Model } from '../lib/types';
import { Map } from 'immutable';

import { Input } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        step: $Model,
        plugin: $Model,
        onChange: PropTypes.func.isRequired
    },

    onArgsChange() {
        let args = this.refs.args.getValue(),
            $conf = Map({
                commandArgs: args,
                Target: ''
            });

        this.props.onChange(this.props.step.set('conf', $conf));
    },

    render() {
        const { step } = this.props;
        const cmdArgs = step.getIn(['conf', 'commandArgs']);

        return <form className="form-horizontal">
            <Input type="text"
                   ref="args"
                   label={iget('Arguments')}
                   value={cmdArgs}
                   labelClassName="col-sm-2"
                   wrapperClassName="col-sm-10"
                   onChange={this.onArgsChange}
                   placeholder={iget('Command line args...')}/>
        </form>;
    }
});

