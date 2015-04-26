/**
 * HttpEntity
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map, List } from 'immutable';
import { shape } from 'react-immutable-proptypes';

import HttpHeader from './http-header';
import HttpBody from './http-body';

export default class HttpEntity extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { status, body, header } = this.props.entity.toObject();

        const headerStyle = {
            marginTop: '1.5rem'
        };

        const hasHeaders = header && header.size;

        return <div>
            <h3>{iget('Status')}</h3>
            {status}

            {hasHeaders && <h3 style={headerStyle}>{iget('Headers')}</h3>}
            {hasHeaders && <HttpHeader header={header}/>}

            {body && <h3 style={headerStyle}>{iget('Body')}</h3>}
            {body && <HttpBody body={body}/>}
        </div>;
    }
    //endregion
}

HttpEntity.propTypes = {
    entity: shape({
        status: PropTypes.string,
        header: PropTypes.instanceOf(List),
        body: PropTypes.instanceOf(Map)
    })
};
