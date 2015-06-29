import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List } from 'immutable';
import { capitalize } from 'lodash';
import autobind from '../lib/autobind';
import { context } from '../lib/nf';
import { create as createStyle } from 'react-style';

import TimelineItem from './timeline-item';
import { Link } from 'react-router';
import Avatar from './avatar';

const cursors = { users: ['users'] };
const S = createStyle({
    avatar: { verticalAlign: 'bottom', margin: '0 0.5rem' }
});

@context({ cursors })
export default class IssueActivities extends Component {
    static propTypes = {
        users: PropTypes.object,
        activities: PropTypes.instanceOf(List)
    };

    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { activities } = this.props;

        return <div>
            {activities.toArray().map(this.renderActivity)}
        </div>;
    }

    @autobind
    renderActivity(activity, i) {
        const { users } = this.props;
        const { created, type, report, user: userId } = activity.toObject();
        const scan = report && report.get('scan');

        let usertext = '';
        if (type === 'reported' && userId) {
            const user = users[userId];
            if(user) {
                usertext = <span>
                    &nbsp;by <Avatar avatar={user.avatar} size={20} style={S.avatar}/>{user.nickname}
                </span>;
            }
        }

        return <TimelineItem icon="cog" date={created} key={i}>
            <p className="m-b-xs">
                <strong>{capitalize(type)}</strong>
                {usertext}
            </p>

            {report && <p>
                <Link to="report" query={{scan}}>Go to report</Link>
            </p>}
        </TimelineItem>;
    }
}
