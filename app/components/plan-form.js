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
import Ibox, { IboxContent } from './ibox';

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
            <Col xs={12} md={4}>
                <Ibox style={{marginTop: '56px'}}><IboxContent>
                    <Input
                        ref="name"
                        type="text"
                        value={name}
                        required
                        onChange={this.onChange}
                        label={iget('Plan name')}/>

                    <Input
                        ref="desc"
                        value={desc}
                        type="textarea"
                        onChange={this.onChange}
                        style={{height: '60px'}}
                        label={iget('Description')}/>
                    <button className="btn btn-primary" disabled={!dirty} onClick={this.onSave}>
                        {iget('Save')}
                    </button>
                </IboxContent></Ibox>
            </Col>
            <Col xs={12} md={8}>
                <h2 className="text-center">{iget('Workflow')}</h2>
                <Workflow $steps={$steps} $plugins={$plugins}/>
            </Col>
        </Row>
    }
});

