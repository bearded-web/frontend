/**
 * TargetCreateForm
 */

'use strict';

import { PropTypes, Component, findDOMNode } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import cn from 'classnames';
import { bindAll } from 'lodash';
import { WEB, ANDROID } from '../lib/target-types';
import { Model } from '../lib/types';

import { Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Fa from './fa';
import WebForm from './target-web-form';
import AndroidForm from './target-android-form';

export default class TargetCreateForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onUrlChange'
        ]);

        this.state = { url: '' };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onUrlChange() {
        this.setState({
            url: findDOMNode(this.refs.url).value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit({ url: this.state.url });
    }

    onTabSelect(type) {
        this.props.onChange(this.props.target.set('type', type));
    }

    //region render
    render() {
        const { url } = this.state;
        const { error, disabled, target, onSubmit, onChange, invalid } = this.props;
        const type = target.get('type');

        const Form = type === ANDROID ?
            AndroidForm :
            WebForm;

        return <div>
            <Row>
                {this.renderButton('globe', iget('Web'), WEB)}
                {this.renderButton('android', iget('Android'), ANDROID)}
                {this.renderButton('apple', iget('IOS'))}
            </Row>

            <br/>
            <Form
                target={target}
                onChange={onChange}/>

            <p className="text-danger">
                {error}
            </p>

            <Button
                onClick={onSubmit}
                bsStyle="primary" disabled={invalid || disabled}>
                {iget('Create target')}
            </Button>

            <span>&nbsp;&nbsp;{invalid}</span>
        </div>;
    }

    renderButton(icon, text, type) {
        const targetType = this.props.target.get('type');
        const buttonStyle = {
            fontSize: '1.6rem'
        };
        const handler = () => this.onTabSelect(type);
        const className = cn('btn btn-primary btn-outline btn-block', {
            active: targetType === type
        });

        return <Col xs={4}>
            <button
                onClick={type && handler}
                style={buttonStyle}
                disabled={!type}
                className={className}>
                <Fa icon={icon} fw size="2x" align="sub"/>
                {text}
            </button>
        </Col>;

    }

    //endregion
}

TargetCreateForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    target: Model,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
};
TargetCreateForm.defaultProps = {
    invalid: true,
    error: '',
    disabled: false
};
