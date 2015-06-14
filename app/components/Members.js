/**
 * Members
 */

import { PropTypes, Component } from 'react/addons';
import { Member } from '../lib/types';
import autobind from '../lib/autobind';
import purify from '../lib/purify';
import { create as createStyle } from 'react-style';
import { context } from '../lib/nf';
import { gray } from '../style';

import Avatar from './avatar';

const S = createStyle({
    member: {
        float: 'left',
        width: 70,
        margin: '5px',
        textAlign: 'center'
    }
});
const cursors = { users: ['users'] };

@context({ cursors })
@purify
export default class Members extends Component {
    static propTypes = {
        users: PropTypes.object,
        members: PropTypes.arrayOf(Member).isRequired
    };
    static defaultProps = {
        users: {}
    };

    render() {
        const { users, members } = this.props;
        const membersUsers = members.map(m => users[m.user]);

        return <div refCollection="users">
            {membersUsers.map(this.renderUser)}
        </div>;
    }

    @autobind
    renderUser({ avatar, nickname, id } = {}, i) {
        const key = id || i;
        const nameStyle = {};

        if (!nickname) {
            nameStyle.display = 'inline-block';
            nameStyle.background = gray;
            nameStyle.width = '60px';
            nameStyle.height = '1rem';
        }

        //TODO add style for empty user
        return <div key={key} style={S.member}>
            <Avatar size={50} avatar={avatar}/>
            <br/>
            <span style={nameStyle}>{nickname}</span>
        </div>;
    }
}

