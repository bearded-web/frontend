/**
 * UserPicker
 */

import { PropTypes, Component } from 'react/addons';
import purify from '../lib/purify';
import { context } from '../lib/nf';
import { User } from '../lib/types';
import { create as createStyle } from 'react-style';
import { setPickerValue } from '../mutators/userMutators';
import autobind from '../lib/autobind';
import { fromJS } from 'immutable';

import { Input } from 'react-bootstrap';
import UserCard from './UserCard';

const S = createStyle({
    users: { marginTop: '0.5rem' },
    picker: { marginTop: '0.5rem' }
});
const cursors = { value: ['userPicker', 'value'] };
const facets = { users: 'userPickerUsers' };

@context({ cursors, facets }, { setPickerValue })
@purify
export default class UserPicker extends Component {
    static contextTypes = {
        tree: PropTypes.object
    };
    static propTypes = {
        value: PropTypes.string,
        onSelect: PropTypes.func,
        users: PropTypes.arrayOf(User)
    };
    static defaultProps = {
        value: '',
        users: [],
        onSelect: () => null
    };

    @autobind
    onInputChange(e) {
        this.props.setPickerValue(e.target.value);
    }

    render() {
        const { value, users } = this.props;
        return <div style={S.picker}>
            <Input
                ref="input"
                value={value}
                onChange={this.onInputChange}
                placeholder={iget('Email')}
                type="text"/>

            <div refCollection="users" style={S.users}>
                {users.map(this.renderUser)}
            </div>
        </div>;
    }

    @autobind
    renderUser(user, i) {
        const key = user.id || i;
        const handler = () => this.props.onSelect(user);
        return <div key={key} onClick={handler}>
            <UserCard user={fromJS(user)}/>
        </div>;
    }
}

