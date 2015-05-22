/**
 * VulnsSelect render select with vulnerability preview
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';
import vulnsStore from '../stores/vulns.store';
import connectToStores from '../lib/connectToStores';

function getState() {
    return { vulns: vulnsStore.getRawState() };
}

@connectToStores([vulnsStore], getState)
export default class VulnsSelect extends Component {
    static propTypes = {
        vulns: PropTypes.instanceOf(Map),
        value: PropTypes.number,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        value: null
    };

    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange(e) {
        const id = parseInt(e.target.value, 10);

        this.props.onChange(this.props.vulns.get(id) || null);
    }

    //region render
    render() {
        const { vulns, value } = this.props;

        return <select
            onChange={e => this.onChange(e)}
            value={value}
            className="form-control">
            <option value="0">{iget('Select type')}</option>
            {vulns.toArray().map(this.renderVuln)}
        </select>;
    }

    renderVuln(vuln) {
        const { id, title, severity } = vuln.toObject();

        return <option value={id} key={id}>
            {title} ({severity})
        </option>;
    }

    //endregion
}

