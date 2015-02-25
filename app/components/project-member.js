'use strict';

import './project-member.less';

import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { isString } from 'lodash';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        member: PropTypes.instanceOf(Map).isRequired
    },

    render() {
        let user = this.props.member.toJS().user || {};

        let style = {
            backgroundImage: `url(${user.avatar})`,
            color: 'red'
        };

        return <a 
            className="c-project-member" 
            style={style}
            title={user.email}></a>
    }
});
