import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { create as createStyle } from 'react-style';

const { PureRenderMixin } = addons;

const size = 20;
const margin = 3;
const S = createStyle({
    member: {
        float: 'left',
        width: size,
        height: size,
        marginRight: margin,
        marginBottom: margin,
        borderRadius: size,
        background: ' #ccc no-repeat center'
    }
});

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        member: PropTypes.instanceOf(Map).isRequired
    },

    render() {
        const user = this.props.member.toJS().user || {};

        let style = {
            backgroundImage: `url(${user.avatar})`
        };

        return <a
            className="c-project-member"
            styles={[S.member, style]}
            title={user.email}></a>;
    }
});
