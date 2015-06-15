/**
 * Members
 */

import { PropTypes, Component } from 'react/addons';
import { Member } from '../lib/types';
import autobind from '../lib/autobind';
import purify from '../lib/purify';
import { create as createStyle } from 'react-style';
import { context } from '../lib/nf';
import { gray, red } from '../style';

import Avatar from './avatar';
import Fa from './fa';

const S = createStyle({
    member: {
        position: 'relative',
        float: 'left',
        width: 70,
        margin: '5px',
        textAlign: 'center'
    },
    remove: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: red,
        width: '2rem',
        height: '2rem',
        borderRadius: '2rem',
        color: 'white'
    }
});
const cursors = { users: ['users'] };

@context({ cursors })
@purify
export default class Members extends Component {
    static propTypes = {
        users: PropTypes.object,
        members: PropTypes.arrayOf(Member).isRequired,
        onDelete: PropTypes.func
    };
    static defaultProps = {
        users: {}
    };
    state = {};

    render() {
        const { users, members } = this.props;
        const membersUsers = members.map(m => users[m.user]);

        return <div refCollection="users" className="clearfix">
            {membersUsers.map(this.renderUser)}
        </div>;
    }

    @autobind
    renderUser(user = {}, i) {
        const { avatar, nickname, id } = user;
        const { onDelete } = this.props;
        const canDelete = !!onDelete;
        const key = id || i;
        const nameStyle = {};

        if (!nickname) {
            nameStyle.display = 'inline-block';
            nameStyle.background = gray;
            nameStyle.width = '60px';
            nameStyle.height = '1rem';
        }

        return <div key={key} style={S.member}>
            <Avatar size={50} avatar={avatar}/>
            <br/>
            <span style={nameStyle}>{nickname}</span>
            {canDelete && <a
                onClick={() => user && onDelete(user)}
                style={S.remove}>
                <Fa icon="remove"/>
            </a>}
        </div>;
    }
}

