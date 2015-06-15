/**
 * EditableMembers
 */

import { PropTypes, Component } from 'react/addons';
import { Member, Project } from '../lib/types';
import { create as createStyle } from 'react-style';
import autobind from '../lib/autobind';
import purify from '../lib/purify';

import Members from './Members';
import UserPicker from './UserPicker';
import { Button } from 'react-bootstrap';

const S = createStyle({
    members: {
    }
});

//@purify
export default class EditableMembers extends Component {
    static propTypes = {
        project: Project,
        members: PropTypes.arrayOf(Member).isRequired
    };
    state = { edit: false };

    @autobind
    showForm(e) {
        e.stopPropagation();

        this.setState({ edit: true });
    }

    @autobind
    onFinish(e) {
        e.stopPropagation();

        this.setState({ edit: false });
    }

    @autobind
    onMemberDelete(user) {

        alert('delete' + user.id);
    }

    render() {
        const { edit } = this.state;
        const { members } = this.props;

        const style = {};
        if (!edit) style.cursor = 'pointer';
        const onDelete = edit ? this.onMemberDelete : null;

        return <div>
            <div style={style} onClick={this.showForm}>
                <Members
                    ref="members"
                    members={members}
                    onDelete={onDelete}/>
            </div>
            {edit && <UserPicker ref="picker"/>}
            {edit && <Button
                ref="finish"
                onClick={this.onFinish}
                bsStyle="success">
                {iget('Finish editing')}
            </Button>}
        </div>;
    }
}

