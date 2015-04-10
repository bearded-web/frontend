'use strict';

import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { openAddMemberModal } from '../actions/project.actions';

import Member from './project-member';
import Fa from './fa';

let { PureRenderMixin } = addons;

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

		return <div onClick={this.onAddMemberClick}>
			{$members.toArray().map(function($member, i){
				return <Member key={i} member={$member}/>;
			})}
			{$members.size ? '' : this.renderAddBtn()}
			<div style={{clear: 'both'}}></div>
		</div>;
	},

	renderAddBtn() {
		return <a  onClick={this.onAddMemberClick}>
			<Fa icon="plus" fw size="lg"/>
			Add member
		</a>;
	}
});
