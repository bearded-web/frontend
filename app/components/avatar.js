import React, { PropTypes, addons } from 'react/addons';

let { PureRenderMixin } = addons;


export default React.createClass({
    mixins: [
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            size: 25
        };
    },

    propTypes: {
        url: PropTypes.string.isRequired,
        size: PropTypes.number
    },

    render() {
        let { size, url } = this.props,
            style = {
                display: 'inline-block',
                verticalAlign: 'middle',
                width: size,
                height: size,
                borderRadius: size,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${url})`
            };

        return <div style={style}></div>
    }
});