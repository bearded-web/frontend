import React, { addons, PropTypes } from 'react/addons';

let { PureRenderMixin, classSet } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        children: PropTypes.node,
        noPadding: PropTypes.bool
    },

    render: function() {
        let { children, noPadding } = this.props;
            classes = classSet({
                'ibox-content': true,
                'no-padding': noPadding
            });

        return <div className={classes}>
            {children}
        </div>
    }
});

