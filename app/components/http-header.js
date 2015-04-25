/**
 * HttpHeader
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';

export default class HttpHeader extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const header = this.props.header.toJS();
        const keys = Object.keys(header);

        return <div>
            {keys.map(key => <div>
                <strong>{key}</strong>: {header[key].join()}
            </div>)}
        </div>;
    }

    //endregion
}

HttpHeader.propTypes = {
    /**
     * Header - hash.
     * {
     *   "key – header name": ["value – array of strings"]
     * }
     */
    header: PropTypes.instanceOf(Map)
};
