import React, { addons, PropTypes, Component } from 'react/addons';
import classSet from 'classnames';

let { PureRenderMixin } = addons;


export default class IboxContent extends Component {
    render() {
        let { children, noPadding } = this.props,
            classes = classSet({
                'ibox-content': true,
                'no-padding': noPadding
            });

        return <div className={classes}>
            {children}

            <div className="clearfix"></div>
        </div>;
    }
}

IboxContent.mixins = [PureRenderMixin];
IboxContent.propTypes = {
    children: PropTypes.node,
    noPadding: PropTypes.bool
};
