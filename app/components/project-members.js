import React, { PropTypes } from 'react/addons';
import { List } from 'immutable';

export default React.createClass({
	propTypes: {
		members: PropTypes.instanceOf(List).isRequired
	},

	render() {
		return <div>
			Members
		</div>
	}
});