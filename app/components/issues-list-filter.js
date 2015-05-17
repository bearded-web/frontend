import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { capitalize, bindAll } from 'lodash';
import { HIGH, MEDIUM, LOW, INFO } from '../lib/severities';
import { Map } from 'immutable';

import { Row, Col, Input } from 'react-bootstrap';

export default class IssuesListFilter extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'renderSeverityOption',
            'renderTypesOption',
            'onChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange() {
        this.props.onChange(Map({
            severity: this.refs.severity.getValue(),
            type: this.refs.type.getValue(),
            search: this.refs.search.getValue()
        }));
    }

    render() {
        const { severity, type, search } = this.props.filter.toObject();

        const severities = [HIGH, MEDIUM, LOW, INFO];
        const types = [
            { id: 1, name: 'Xss super attack' },
            { id: 2, name: 'SQL injection' },
            { id: 3, name: 'Outdated JS' }
        ];

        return <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Input
                    type="select"
                    ref="severity"
                    value={severity}
                    onChange={this.onChange}>
                    <option value="all">All severities</option>
                    {severities.map(this.renderSeverityOption)}
                </Input>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Input
                    type="select"
                    ref="type"
                    value={type}
                    onChange={this.onChange}>
                    <option value="all">All types</option>
                    {types.map(this.renderTypesOption)}
                </Input>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Input
                    type="text"
                    ref="search"
                    value={search}
                    onChange={this.onChange}/>
            </Col>
        </Row>;
    }

    renderSeverityOption(severity) {
        return <option value={severity} key={severity}>
            {capitalize(severity)}
        </option>;
    }

    renderTypesOption(type) {
        const { id, name } = type;

        return <option value={id} key={id}>
            {name}
        </option>;
    }
}

IssuesListFilter.propTypes = {
    filter: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};

