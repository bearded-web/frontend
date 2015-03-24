"use strict";

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { is } from 'immutable';
import { $Model, $Models } from '../lib/types';
import { keys, zipObject } from 'lodash';
import { saveEdit, change } from '../actions/plan.actions';

import { Row, Col, Input, ButtonGroup, Button } from 'react-bootstrap';
import Workflow from './workflow';
import Fa from './fa';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        $plan: $Model,
        $plugins: $Models
    },

    getValues() {
        let refs = keys(this.refs);

        return zipObject(refs, refs.map(k => this.refs[k].getValue()))
    },


    onChange() {
        let { $plan } = this.props;

        change(this.getValues());
    },

    onSave() {
        saveEdit();
    },

    //TODO add component for 2 columns
    render() {
        let { $plugins, $plan } = this.props,
            { name, desc, dirty } = $plan ? $plan.toObject() : {},
            $steps = $plan.get('workflow');

        return <Row>
            <Col xs={12} sm={6}>
                <label>{iget('Target type')}</label>
                <br/>
                <ButtonGroup>
                    <button className="btn-white btn btn-sm">
                        <Fa icon="globe" size="lg"/> {iget('Web')}
                    </button>
                    <button className="btn-white btn btn-sm" disabled>
                        <Fa icon="mobile" size="lg"/> {iget('Mobile')}
                    </button>
                </ButtonGroup>
                <br/>
                <Input
                    ref="name"
                    type="text"
                    value={name}
                    required
                    onChange={this.onChange}
                    label={iget('Plan name')}/>
            </Col>
            <Col xs={12} sm={6}>
                <Input
                    ref="desc"
                    value={desc}
                    type="textarea"
                    onChange={this.onChange}
                    style={{height:'90px'}}
                    label={iget('Description')}/>
            </Col>
            <Col xs={12}>
                <button className="btn btn-primary" disabled={!dirty} onClick={this.onSave}>
                    {iget('Save')}
                </button>
            </Col>
            <Col xs={12} style={{marginTop: '30px'}}>
                <h2>{iget('Workflow')}</h2>
                <Workflow $steps={$steps} $plugins={$plugins}/>
            </Col>
        </Row>
    }
});

