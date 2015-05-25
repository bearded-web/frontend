/**
 * Component used in left panel to show current user and some actions
 * (logout, go to settings, etc.)
 */

import { Component, PropTypes } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import { logOut } from '../actions/auth.actions';
import authStore from '../stores/auth.store';
import connectToStores from '../lib/connectToStores';
import { create as createStyle } from 'react-style';
import autobind from '../lib/autobind';

import Avatar from './avatar';
import Fa from './fa';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const S = createStyle({
    avatar: {
        marginRight: '1rem'
    }
});

@connectToStores([authStore], () => authStore.getState())
export default class ProfileNav extends Component {
    static propTypes = {
        user: Model
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onLogoutClick() {
        logOut();
    }

    @autobind
    onSettingsClick() {
        this.context.router.transitionTo('user-settings', {});
    }

    render() {
        const { avatar, nickname } = this.props.user.toObject();
        const title = <span>
            <Avatar avatar={avatar} style={S.avatar} size={32}/>
            {nickname}
        </span>;

        return <div>
            <DropdownButton bsStyle="link" title={title}>
                <MenuItem onSelect={this.onSettingsClick}>
                    <Fa icon="cog" fw/>
                    {iget('Settings')}
                </MenuItem>
                <MenuItem divider/>
                <MenuItem onSelect={this.onLogoutClick}>
                    <Fa icon="sign-out" fw/>
                    {iget('Logout')}
                </MenuItem>
            </DropdownButton>
        </div>;
    }
}
