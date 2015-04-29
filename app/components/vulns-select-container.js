/**
 * VulnsSelectContainer
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fromJS } from 'immutable';
import { bindAll } from 'lodash';
import vulnsStore from '../stores/vulns.store';

import VulnsSelect from './vulns-select';

export default class VulnsSelectContainer extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            '_onStoreChange'
        ]);

        this.state = this._getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region lifecycle

    componentDidMount() {
        vulnsStore.onChange(this._onStoreChange);
    }

    componentWillUnmount() {
        vulnsStore.offChange(this._onStoreChange);
    }

    //endregion lifecycle

    _onStoreChange() {
        this.setState(this._getState());
    }
    _getState() {
        return { vulns: vulnsStore.asList() };
    }

    //region render
    render() {
        const { vulns } = this.state;
        const { value, onChange } = this.props;

        return <VulnsSelect vulns={vulns}
                            value={value}
                            onChange={onChange}/>;
    }

    //endregion
}

VulnsSelectContainer.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};
VulnsSelectContainer.defaultProps = {
    value: 0
};
