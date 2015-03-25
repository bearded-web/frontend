'use strict';

import React, { PropTypes, addons, Component } from 'react/addons';

let { PureRenderMixin } = addons;

export var mixins = [PureRenderMixin];
export var propTypes = {
    children: PropTypes.node
};

/**
 * Panel container
 */
export default class Ibox extends Component {
    render() {
        return <div className="ibox">
            {this.props.children}
        </div>;
    }
}

export var IboxTitle = require('./ibox-title');
export var IboxContent = require('./ibox-content');

if (module.hot) {
    module.hot.accept(['./ibox-content', './ibox-title']);
}
