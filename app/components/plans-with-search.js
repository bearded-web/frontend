'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { $Models } from '../lib/types';
import { bindAll } from 'lodash';

import Plans from './plans';
import { Row, Col, Input } from 'react-bootstrap';

export default class PlansWithSearch extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;

        bindAll(this, [
            'onSearchChange'
        ]);

        this.state = { search: '' };
    }

    onSearchChange() {
        let search = this.refs.search.getDOMNode().value;

        this.setState({ search });
    }

    render() {
        let { search } = this.state;

        return <div>
            <Row className="c-scan--controls">
                <Col xs={12} md={4} mdOffset={4}>
                    <input type="text"
                           ref="search"
                           value={search}
                           style={{ borderRadius: '30px' }}
                           className="form-control input-lg"
                           onChange={this.onSearchChange}
                           placeholder={iget('Search')}/>
                </Col>
            </Row>
            <Plans {...this.props} search={search}/>
        </div>;
    }
}

PlansWithSearch.propTypes = {
    plans: $Models,
    onStartScan: PropTypes.func
};

