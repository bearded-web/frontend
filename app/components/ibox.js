'use strict';

import React, { PropTypes, addons, Component } from 'react/addons';

let { PureRenderMixin } = addons;

/**
 * Panel container
 */
export default class Ibox extends Component {
    render() {
        return <div {...this.props} className="ibox">
            {this.props.children}
        </div>;
    }
}

Ibox.propTypes = {
    children: PropTypes.node
};

export var IboxTitle = require('./ibox-title');
export var IboxContent = require('./ibox-content');

if (module.hot) {
    module.hot.accept(['./ibox-content', './ibox-title']);
}
