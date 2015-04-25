/**
 * HttpTransaction
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';
import { listOf, shape } from 'react-immutable-proptypes';

import HttpEntity from './http-entity';
import { Well, TabbedArea, TabPane } from 'react-bootstrap';

const urlStyle = {
    display: 'inline-block',
    marginBottom: '0',
    marginLeft: '1rem'
};
const tabStyle = {
    paddingTop: '1rem'
};

export default class HttpTransaction extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { method, url, request, response } = this.props.transaction.toObject();

        return <div>
            <h4>
                <strong>{method}</strong>
                <Well style={urlStyle} bsSize="small">{url}</Well>
            </h4>
            <br/>
            {(response || request) && this.renderTabs(request, response)}
        </div>;
    }

    renderTabs(request, response) {
        return <TabbedArea defaultActiveKey={2}>

            {request && <TabPane style={tabStyle} eventKey={1} tab={iget('Request')}>
                <HttpEntity entity={request}/>
            </TabPane>}

            {response && <TabPane style={tabStyle} eventKey={2} tab={iget('Response')}>
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
