'use strict';

import { PropTypes, Component, DOM } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { parse } from 'markdown';
import { assign } from 'lodash';

export default class Markdown extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const El = DOM[this.props.el];
        const props = assign({}, this.props, {
            className: 'markdown',
            dangerouslySetInnerHTML: { __html: parse(this.props.text) }
        });

        return El(props);
    }
}

Markdown.propTypes = {
    text: PropTypes.string,
    el: PropTypes.oneOf(Object.keys(DOM))
};
Markdown.defaultProps = {
    text: '',
    el: 'div'
};
