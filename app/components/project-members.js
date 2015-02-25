'use strict';

import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { openAddMemberModal } from '../actions/project.actions';

import Member from './project-member';
import Fa from './fa';

let { PureRenderMixin } = addons;

let addStyle = {
	fontSize: '20px',
	lineHeight: '25px'
};

export default React.createClass({
	mixins: [PureRenderMixin],

	propTypes: {
		project: PropTypes.instanceOf(Map).isRequired
	},

	onAddMemberClick() {
		openAddMemberModal(this.props.project);
	},

	render() {
		let $project = this.props.project,
			$members = $project.get('members');

		return <div>
			{$members.toArray().map(function($member, i){
				return <Member key={i} member={$member}/>
			})}

			<a 
				title={__('Add member to project')}
				style={addStyle} 
				onClick={this.onAddMemberClick}>
				<Fa icon="plus" fw/>
			</a>

			<div style={{clear: 'both'}}></div>
		</div>
	}
});