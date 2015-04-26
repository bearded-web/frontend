/**
 * HttpTransaction
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';
import { listOf, shape } from 'react-immutable-proptypes';
import { create as style } from 'react-style';

import HttpEntity from './http-entity';
import { Well, TabbedArea, TabPane } from 'react-bootstrap';


const S = style({
    component: {
        backgroundColor: '#EFFBFF',
        padding: '1rem',
        marginBottom: '2rem'
    },
    params: {
        marginBottom: '2rem'
    },
    url: {
        display: 'inline-block',
        marginBottom: '0',
        marginLeft: '1rem'
    },
    tab: {
        paddingTop: '1rem'
    }
});

export default class HttpTransaction extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { method, url, request, response, params } = this.props.transaction.toObject();

        return <div style={S.component}>
            <h4>
                <strong>{method}</strong>
                <Well style={S.url} bsSize="small">{url}</Well>
            </h4>
            {this.renderParams(params)}
            <br/>
            {(response || request) && this.renderTabs(request, response)}
        </div>;
    }

    renderParams(params) {
        if (!params || !params.size) return '';

        const paramsStr = params.toArray().join(', ');

        return <div style={S.params}>
            <strong>{iget('Params')}: </strong>
            {paramsStr}
        </div>;
    }

    renderTabs(request, response) {
        return <TabbedArea defaultActiveKey={1}>

            {request && <TabPane style={S.tab} eventKey={1} tab={iget('Request')}>
                <HttpEntity entity={request}/>
            </TabPane>}

            {response && <TabPane style={S.tab} eventKey={2} tab={iget('Response')}>
                <HttpEntity entity={response}/>
            </TabPane>}

        </TabbedArea>;
    }

    //endregion
}

const str = PropTypes.string;

HttpTransaction.propTypes = {
    transaction: shape({
        url: str.isRequired,
        method: str.isRequired,
        id: PropTypes.number,
        params: listOf(str),
        request: PropTypes.instanceOf(Map),
        response: PropTypes.instanceOf(Map)
    })
};
