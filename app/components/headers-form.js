/**
 * HeadersForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';

import { Row, Col, Input, Button } from 'react-bootstrap';

export default class HeadersForm extends Component {
    constructor(props, context) {
        super(props, context);

        const headers = this.props.headers.toJS();
        const headerToObject = name => ({ name, values: headers[name] });

        this.state = {
            fields: Object.keys(headers).map(headerToObject)
        };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            fields: this.fieldsFromProps(newProps)
        });
    }

    onAddClick() {
        this.props.onChange(this.props.headers.set('header', Map({
            'выаф': 'афыва'
        })));
    }

    //region render
    render() {
        const { fields } = this.state;
        const headers = this.props.headers.toJS();

        return <div>
            {fields.map(this.renderHeader)}
            <Button
                onClick={() => this.onAddClick}
                bsSize="small">
                {iget('Add header')}
            </Button>
        </div>;
    }

    renderHeader({ name, values }) {
        return <div>
            {name}
            <br/>
            {values}
        </div>;
    }

    //endregion

    fieldsFromProps(props) {
        const headers = props.headers.toJS();
        const headerToObject = name => ({ name, values: headers[name] });

        return Object.keys(headers).map(headerToObject);
    }
}

HeadersForm.propTypes = {
    headers: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};
