import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { create } from '../actions/project.actions.js';
import { closeModal } from '../actions/app.actions.js';

let { PureRenderMixin } = addons;

import ErrorMessage from './error-message';
import { Modal, Input, Button } from 'react-bootstrap';

export default React.createClass({
	mixins: [PureRenderMixin],

	propTypes: {
		onRequestHide: PropTypes.func
	},

	onSubmit() {
		let name = this.refs.name.getValue();

		create(name).then(closeModal);
	},

	render() {
		let error = '',
			{ onRequestHide } = this.props;

		return <Modal title="Create new projext" onRequestHide={onRequestHide}  animation={true}>
            <form onSubmit={this.onSubmit}>
                <div className="modal-body">
                	<Input 
                		ref="name"
                		required
                		label={__('Project name')} 
                		type="text"
                		placeholder={__('Project name')}/>
                   
                    <ErrorMessage text={error} />
                </div>
                <div className="modal-footer">
                    <Button onClick={onRequestHide}>
                    	{__('Cancel')}
                    </Button>
                    <Button bsStyle="primary" type="submit">{__('Create project')}</Button>
                </div>
            </form>
        </Modal>
	}
});