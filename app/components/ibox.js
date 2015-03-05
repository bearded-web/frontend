import React, { PropTypes, addons } from 'react/addons';


let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div className="ibox">
                {this.props.children}
            </div>
        );
    }
});

export var IboxTitle = require('./ibox-title');
export var IboxContent = require('./ibox-content');


if (module.hot) {
    module.hot.accept(['./ibox-content', './ibox-title']);
}
