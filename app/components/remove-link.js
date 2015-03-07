"use strict";

import { PropTypes, addons, createClass } from 'react/addons';

import Fa from './fa';

export default createClass({
    mixins: [addons.PureRenderMixin],

    propTypes: {
        onClick: PropTypes.func
    },

    render() {
        return <a className="pull-right"
                  onClick={this.props.onClick}
                  title={iget('Remove')}>
            <Fa icon="remove"/>
        </a>
    }
});

