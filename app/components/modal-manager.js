import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { closeModal } from '../actions/app.actions.js';

import ProjectCreateModal from './project-create-modal'
import AddMemberModal from './add-member-modal';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        modal: PropTypes.instanceOf(Map).isRequired
    },

    onRequestHide() {
        closeModal();
    },

    render() {
        let $modal = this.props.modal,
            name = $modal.get('name');

        if (name === 'project-create') {
            return <ProjectCreateModal onRequestHide={this.onRequestHide} animation={true}/>;
        }
        if (name === 'project-add-member') {
            return <AddMemberModal params={$modal.toObject()} onRequestHide={this.onRequestHide} animation={true}/>;
        }

        return <span></span>;
    }
});
