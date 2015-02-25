'use strict';

import './suggest-users.less';

import React, { PropTypes, addons } from 'react/addons';
import { List } from 'immutable';

import User from './suggest-user';

let { PureRenderMixin } = addons;

//TODO rewrite as clean suggest
// mb smt like <Suggest collection={} onSelect={} elemen={} />
// where element is React component to render each collection item
export default React.createClass({
    mixins: [
        PureRenderMixin
    ],

    propTypes: {
        $users: PropTypes.instanceOf(List).isRequired,
        onSelect: PropTypes.func.isRequired
    },

    buildHandler($user) {
        return this.props.onSelect.bind(null, $user)
    },

    render() {
        return <div>
            {this.props.$users.toArray().map(($user, i) => {
                return <a 
                    key={i} 
                    className="c-suggest-users--item"
                    onClick={this.buildHandler($user)}>
                    <User $user={$user} />
                </a>
            })}
        </div>
    }
});

if (module.hot) {
    module.hot.accept([
        './suggest-user'
    ], function() {
        //TODO flux add actions
    });
}