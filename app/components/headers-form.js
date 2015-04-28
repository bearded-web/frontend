/**
 * HeadersForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import { Row, Col, Input, Button } from 'react-bootstrap';

export default class HeadersForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { value } = this.props;

        return <div>
            <h4>{iget('Headers')}</h4>
            <Row>
                <Col xs={12} md={6}>
                    <Input type="text"
                           placeholder={iget('Name')}/>
                </Col>
                <Col xs={12} md={6}>
                    <Input type="text"
                           placeholder={iget('Value')}/>
                </Col>
                {JSON.stringify(this.props.value)}
            </Row>
            <Button bsSize="small">
                {iget('Add header')}
            </Button>
        </div>;
    }

    //endregion
}

HeadersForm.propTypes = {
    value: PropTypes.object
};
