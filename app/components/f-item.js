'use strict';

/*
This component render feed item with user, action text and content
 */

import React, { addons, PropTypes } from 'react/addons';
import { $Model } from '../lib/types';
import { Map } from 'immutable';
import moment from 'moment';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        $user: $Model,
        time: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ]),
        action: PropTypes.string,
        children: PropTypes.node
    },

    render: function() {
        const { children, $user, time, action } = this.props;
        const timestamp = moment(time).calendar();

        let avatar, nickname;

        if (Map.isMap($user)) {
            avatar = $user.get('avatar');
            nickname = $user.get('nickname');
        }

        return <div className="feed-element">
            <a className="pull-left">
                <img className="img-circle" src={avatar}/>
            </a>
            <div className="media-body">
                <small className="pull-right">
                    {timestamp}
                </small>
                <strong>{nickname}</strong>
                &nbsp;commented
                <br/>
                {children}
            </div>
        </div>;
    }
});
