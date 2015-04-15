'use strict';

import { createClass, PropTypes } from 'react/addons';

import { Row, Col } from 'react-bootstrap';

export default createClass({
    propTypes: {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    },

    render() {
        const style = { marginBottom: '10px' };

        return <Row style={style} className="border-bottom white-bg page-heading">
            {this.props.children}
        </Row>;
    }
});
