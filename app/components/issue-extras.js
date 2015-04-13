'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import List from 'immutable';

export default class IssueExtras extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { extras } = this.props;

        return <ul className="list-unstyled">
            {extras.toArray().map(this.renderExtra)}
        </ul>;
    }

    renderExtra(extra, i) {
        const { url } = extra.toObject();
        const style = {
            marginBottom: '10px'
        };

        return <li ley={i} style={style}>
            <a href={url} target="_blank">{url}</a>
        </li>;
    }
}

IssueExtras.propTypes = {
    extras: PropTypes.instanceOf(List)
};

