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
        return <Row className="border-bottom white-bg page-heading">
            {this.props.children}
        </Row>;
    }
});
