'use strict';

import { PropTypes, addons, Component } from 'react/addons';
import { chunk, zip, spread, bindAll } from 'lodash';

import { Row, Col } from 'react-bootstrap';

export default class Tiles extends Component {
    constructor() {
        super();

        this.columns = 3;

        bindAll(this, ['renderColumn', 'renderElement']);
    }

    render() {
        let elements = spread(zip)(chunk(this.props.children, this.columns));

        return <Row>
            {elements.map(this.renderColumn)}
        </Row>;
    }

    renderColumn(elements, k) {
        let md = 12 / this.columns;

        return <Col key={k} xs={12} md={md}>
            {elements.map(this.renderElement)}
        </Col>;
    }

    renderElement(element, k) {
        return <div key={k}>{element}</div>;
    }
}

Tiles.mixins = [addons.PureRenderMixin];
Tiles.propTypes = {
    children: PropTypes.node
};

