'use strict';
import techs from '../lib/techs';

import React, { addons } from 'react/addons';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';


export default React.createClass({
    render() {
        let style = {
        };

        return <Row style={style}>
            <Col xs={12}>
                {techs.map(this.renderTech)}
            </Col>
        </Row>

    },

    renderTech(tech, i) {
        let {name, icon} = tech,
            style = {
                margin: '4px',
                width: '25px',
                height: '25px'
            },
            tooltip = <Tooltip><strong>{name}</strong></Tooltip>;

        return  <OverlayTrigger placement="bottom" overlay={tooltip}>
            <img src={icon} style={style}/>
        </OverlayTrigger>
    }
});