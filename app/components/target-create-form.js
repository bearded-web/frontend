/**
 * TargetCreateForm
 */

'use strict';

import { PropTypes, Component, findDOMNode } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import cn from 'classnames';
import { bindAll } from 'lodash';

import { Row, Col, Button } from 'react-bootstrap';
import Fa from './fa';

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

    //region render
    render() {
        const { url } = this.state;
        const { error, disabled } = this.props;
        const controlClasses = cn('form-group', {
            'has-error': error
        });
        const btnDisabled = !url.length || disabled || !url.match(/^https?:\/\/.+/gi);

        return <div>
            <Row>
                {this.renderButton('globe', iget('Web'), true)}
                {this.renderButton('mobile', iget('Mobile'))}
                {this.renderButton('code', iget('Code'))}
            </Row>

            <br/>

            <form onSubmit={this.onSubmit}>
                <div className={controlClasses}>
                    <label htmlFor="create-target-url">
                        {iget('Enter target url')}
                    </label>
                    <input type="text"
                           ref="url"
                           value={url}
                           onChange={this.onUrlChange}
                           id="create-target-url"
                           disabled={disabled}
                           placeholder={iget('http://example.com')}
                           className="form-control input-lg"/>
                </div>

                <p className="text-danger">
                    {error}
                </p>

                <Button type="submit" bsStyle="primary" disabled={btnDisabled}>
                    {iget('Create target')}
                </Button>
            </form>
        </div>;
    }

    renderButton(icon, text, enabled) {
        const buttonStyle = {
            fontSize: '1.6rem'
        };

        return <Col xs={4}>
            <button style={buttonStyle}
                    disabled={!enabled}
                    className="btn btn-primary btn-outline btn-block">
                <Fa icon={icon} fw size="2x" align="sub"/>
                {text}
            </button>
        </Col>;

    }

    //endregion
}

TargetCreateForm.propTypes = {
    error: PropTypes.string,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
};
TargetCreateForm.defaultProps = {
    error: '',
    disabled: false
};
