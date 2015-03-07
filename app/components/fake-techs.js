'use strict';
import techs from '../lib/techs';

import React, { addons } from 'react/addons';
import { Row, Col } from 'react-bootstrap';


export default React.createClass({
    render() {
        let style = {
            marginTop: '18px'
        };

        return <Row style={style}>
            <Col xs={12}>
                <h4>{iget('Found technologies')}</h4>
            </Col>
            {techs.map(this.renderTech)}
        </Row>

    },

    renderTech(tech, i) {
        let {name, icon} = tech;

        return <Col sm={4} key={i} className="c-fake-techs">
            <img src={icon}/>
            {name}
        </Col>
    }
});