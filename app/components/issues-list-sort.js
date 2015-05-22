'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { updateSort } from '../actions/issuesActions';

import { Input } from 'react-bootstrap';

const sortTypes = ['created', 'severity'];

export default class IssuesListSort extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onChange',
            'renderType'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange() {
        updateSort(this.refs.select.getValue());
    }

    render() {
        const { sortBy } = this.props;

        return <Input
            ref="select"
            type="select"
            value={sortBy}
            onChange={this.onChange}>
            {sortTypes.map(this.renderType)}
        </Input>;
    }

    renderType(type) {
        return <option value={type} key={type}>
            Sort by {type}
        </option>;
    }
}

IssuesListSort.propTypes = {
    sortBy: PropTypes.string.isRequired
};

