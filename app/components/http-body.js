/**
 * HttpBody
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import { defaults } from 'lodash';

const contentStyle = {
    fontSize: '1.2rem',
    overflowWrap: 'break-word',
    overflow: 'hidden'
};

export default class HttpBody extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { expanded: false };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    expand() {
        this.setState({ expanded: true });
    }

    //region render
    render() {
        const { expanded } = this.state;
        const { content } = this.props.body.toObject();
        const preStyle = defaults(expanded ? {} : {
            maxHeight: '200px',
            marginBottom: 0,
            borderBottom: 'none',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        }, contentStyle);

        return <div>
            <pre style={preStyle}>
                {content}
            </pre>

            {expanded || <button
                onClick={() => this.expand()}
                className="bnt btn-block btn-white">

                {iget('Expand')}
            </button>}
        </div>;
    }

    //endregion
}

HttpBody.propTypes = {
    body: shape({
        content: PropTypes.string.isRequired,
        contentEncoding: PropTypes.string.isRequired
    })
};
