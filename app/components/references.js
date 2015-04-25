'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf, shape } from 'react-immutable-proptypes';


export default class References extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { references } = this.props;

        return <ul className="list-unstyled">
            {references.toArray().map(this.renderRef)}
        </ul>;
    }

    renderRef(ref, i) {
        const { url, title } = ref.toObject();
        const style = {
            marginBottom: '10px',
            wordBreak: 'break-all'
        };

        return <li key={i} style={style}>
            <a href={url} target="_blank">{title || url}</a>
        </li>;
    }
}

References.propTypes = {
    references: listOf(shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string
    })).isRequired
};

