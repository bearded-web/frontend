'use strict';

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Model } from '../lib/types';
import { Map } from 'immutable';
import { captureException } from 'raven-js';

import { Input, ButtonGroup, Button } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        step: $Model,
        plugin: $Model,
        onChange: PropTypes.func.isRequired
    },

    getInitialState() {
        return {type: 'Plan'};
    },

    onFormDataChange(type) {
        let data = this.refs.data.getValue(),
            $conf = Map({
                formData: JSON.stringify({data: data, type: type})
            });
        this.props.onChange(this.props.step.set('conf', $conf));
    },

    onTypeClick(type) {
        this.setState({type});
    },

    render() {
        const { step } = this.props;
        const formData = step.getIn(['conf', 'formData']);

        let w3afData = {data: '', type: 'plan'};

        if (formData !== undefined) {
            try {
                w3afData = JSON.parse(formData);
            } catch(e) {
                captureException(e);
            }
        }

        let form = this.renderPlanForm;

        switch (this.state.type) {
            case 'Plan':
                form = this.renderPlanForm;
                break;
            case 'Script':
                form = this.renderScriptForm;
                break;
            case 'Custom':
                form = this.renderCustomForm;
                break;
        }

        return <div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">{iget('')}</label>
                    <div className="col-sm-9">
                        <ButtonGroup>
                            {this.renderTypeButton('Plan')}
                            {this.renderTypeButton('Script')}
                            {this.renderTypeButton('Custom')}
                        </ButtonGroup>
                    </div>
                </div>
            </form>
                {form(w3afData)}
        </div>;

    },

    renderTypeButton(type) {
        let active = this.state.type === type;
        let className = 'btn-white' + (active? ' active': '');
        return <Button className={className} onClick={this.onTypeClick.bind(this, type)}>{iget(type)}</Button>;
    },

    renderPlanForm(w3afData) {
        let help = <span>
            <a href="http://docs.w3af.org/en/latest/gui/scanning.html#using-the-profiles" target="_blank">{iget('Read more')}</a> {iget('about w3af profiles')}
        </span>;

        return this.renderForm(w3afData, 'plan', help);

    },

    renderScriptForm(w3afData) {
        let help = <span>
            <a href="http://docs.w3af.org/en/latest/scripts.html" target="_blank">{iget('Read more')}</a> {iget('about w3af scripts')}
        </span>;

        return this.renderForm(w3afData, 'script', help);
    },

    renderForm(w3afData, type, help) {
        return <form className="form-horizontal">
            <Input
                ref="data"
                value={w3afData.type === type ? w3afData.data: ''}
                type="textarea"
                rows="10"
                wrapperClassName="col-xs-10"
                onChange={this.onFormDataChange.bind(this, type)}
                labelClassName="col-xs-2"
                help={help}
                label=' '/>
        </form>;
    },

    renderCustomForm(w3afData) {
        return <div className="col-md-offset-2"><h2>{iget('Coming soon')}</h2></div>;
    }


});

