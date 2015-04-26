/**
 * Header component for build page header
 * If "title" prop provided render h2 title
 */

'use strict';

import { PropTypes, Component } from 'react/addons';

import { Row } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        const { title, children } = this.props;
        const style = { marginBottom: '10px' };

        return <Row style={style} className="border-bottom white-bg page-heading">
            {title && <h2>{title}</h2>}

            {children}
        </Row>;
    }
}

Header.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};
Header.defaultProps = {
    title: ''
};
