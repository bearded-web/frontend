'use strict';

/*
This component render feed item with user, action text and content
 */

import React, { addons, PropTypes } from 'react/addons';
import { $Model } from '../lib/types';
import moment from 'moment';

let { PureRenderMixin, classSet } = addons;

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
        let { children, $user, time, action } = this.props,
            { avatar, nickname } = $user.toJS(),
            timestamp = moment(time).calendar();

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
