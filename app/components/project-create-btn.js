import React, { PropTypes, addons } from 'react/addons';
import { List, Map } from 'immutable';
import { openCreateModal } from '../actions/project.actions';

import Fa from './fa';

export default React.createClass({
	onCLick() {
		openCreateModal();
	},

	render() {
		return <a onClick={this.onCLick}>
            <Fa icon="plus" fw/>
            {i18n.gettext('Create project')}
        </a>
	}

});