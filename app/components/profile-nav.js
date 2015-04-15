'use strict';

/**
 * Component used in left panel to show current user and some actions
 * (logout, go to settings, etc.)
 */

import { Component, PropTypes } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import { logOut } from '../actions/auth.actions';

import Avatar from './avatar';
import Fa from './fa';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class ProfileNav extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onLogoutClick',
            'onSettingsClick'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onLogoutClick() {
        logOut();
    }

    onSettingsClick(e) {
        e.preventDefault();

        this.context.router.transitionTo('user-settings', {});
    }

    render() {
        const { avatar, nickname } = this.props.user.toObject();
        const avStyle = {
            marginRight: '1rem'
        };
        return <div>
            <Avatar avatar={avatar} style={avStyle}/>
            <DropdownButton bsStyle="link" title={nickname}>
                <MenuItem onClick={this.onSettingsClick}>
                    <Fa icon="cog" fw/>
                    {iget('Settings')}
                </MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.onLogoutClick}>
                    <Fa icon="sign-out" fw/>
                    {iget('Logout')}
                </MenuItem>
            </DropdownButton>
        </div>;
    }
}

ProfileNav.propTypes = {
    user: Model
};

ProfileNav.contextTypes = {
    router: PropTypes.func
};
