import { PropTypes, Component } from 'react/addons';
import classSet from 'classnames';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

export default class IboxContent extends Component {
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { children, noPadding, style } = this.props;

        const classes = classSet({
            'ibox-content': true,
            'no-padding': noPadding
        });

        return <div {...this.props} className={classes} style={style}>
            {children}
            <div className="clearfix"></div>
        </div>;
    }
}

IboxContent.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    noPadding: PropTypes.bool
};
IboxContent.defaultProps = {
    style: {},
    noPadding: false
};
