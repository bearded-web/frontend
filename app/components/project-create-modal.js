import React, { PropTypes, addons } from 'react/addons';
import { createProject } from '../mutators/projectsMutators';
import { closeModal } from '../actions/app.actions.js';

let { PureRenderMixin } = addons;

import ErrorMessage from './error-message';
import { Modal, Input, Button } from 'react-bootstrap';

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        onRequestHide: PropTypes.func
    },

    contextTypes: {
        tree: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired
    },

    onSubmit() {
        let name = this.refs.name.getValue();
        const { tree, api } = this.context;

        createProject({ tree, api }, name).then(closeModal);
    },

    render() {
        let error = '',
            { onRequestHide } = this.props,
            title = __('Create new project');

        return <Modal title={title} onRequestHide={onRequestHide} animation={true}>
            <form onSubmit={this.onSubmit}>
                <div className="modal-body">
                    <Input
                        ref="name"
                        required
                        label={__('Project name')}
                        type="text"
                        placeholder={__('Project name')}/>

                    <ErrorMessage text={error}/>
                </div>
                <div className="modal-footer">
                    <Button onClick={onRequestHide}>
                        {__('Cancel')}
                    </Button>
                    <Button bsStyle="primary" type="submit">{__('Create project')}</Button>
                </div>
            </form>
        </Modal>;
    }
});
