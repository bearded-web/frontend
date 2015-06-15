/**
 * EditableMembers
 */

import { PropTypes, Component } from 'react/addons';
import { Member, Project } from '../lib/types';
import { create as createStyle } from 'react-style';
import autobind from '../lib/autobind';
import purify from '../lib/purify';
import { deleteMember, addMember } from '../mutators/projectsMutators';
import { setPickerValue } from '../mutators/userMutators';
import { context } from '../lib/nf';

import Members from './Members';
import UserPicker from './UserPicker';
import { Button } from 'react-bootstrap';

const S = createStyle({
    members: {
    }
});

@context({}, { deleteMember, addMember, setPickerValue })
@purify
export default class EditableMembers extends Component {
    static propTypes = {
        project: Project,
        members: PropTypes.arrayOf(Member).isRequired,
        deleteMember: PropTypes.func,
        addMember: PropTypes.func,
        setPickerValue: PropTypes.func
    };
    state = { edit: false };

    @autobind
    showForm(e) {
        e.stopPropagation();

        this.setState({ edit: true });
    }

    @autobind
    addMember(user) {
        this.props.addMember(this.props.project.id, user.id);
        this.props.setPickerValue('');
    }

    @autobind
    onFinish(e) {
        e.stopPropagation();

        this.setState({ edit: false });
    }

    @autobind
    onMemberDelete(user) {
        this.props.deleteMember(
            this.props.project.id,
            user.id
        );
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
            {edit && <UserPicker ref="picker" onSelect={this.addMember}/>}
            {edit && <Button
                ref="finish"
                onClick={this.onFinish}
                bsStyle="success">
                {iget('Finish editing')}
            </Button>}
        </div>;
    }
}

