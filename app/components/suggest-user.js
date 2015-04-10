import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';

import Avatar from './avatar';

let { PureRenderMixin } = addons;


export default React.createClass({
    mixins: [
        PureRenderMixin
    ],

    propTypes: {
        $user: PropTypes.instanceOf(Map)
    },

    render() {
        let user = this.props.$user.toJS();

        return <div style={{fontSize: '16px'}}>
            <Avatar url={user.avatar} size={30} />
            &nbsp;
            {user.email}
        </div>;
    }
});

if (module.hot) {
    module.hot.accept([
        './avatar'
    ], function() {
        //TODO flux add actions
    });
}
