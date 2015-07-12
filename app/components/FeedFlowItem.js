import { Component, PropTypes } from 'react';
import { context } from '../lib/nf';
import { clone } from 'lodash';
import { FeedItem as FeedItemType } from '../lib/types';
import { create as createStyle } from 'react-style';
import moment from 'moment';
import { HIGH, MEDIUM, LOW, INFO } from '../lib/severities';

import Avatar from './avatar';
import TargetScan from './target-scan';
import TechIcon from './TechIcon';

const S = createStyle({
    item: {
        margin: '1rem 0 1.5rem 0',
        borderBottom: '1px solid #E7EAEC'
    },
    techs: { marginTop: '2.5rem' },
    tIcon: {
        marginRight: '0.5rem',
        height: '2rem',
        width: '2rem',
        lineHeight: '2rem',
        fontSize: '1.5rem'
    },
    summary: { marginTop: '2.5rem' },
    sList: { paddingLeft: 0 }
});
//TODO use cursor from parent instead global users cursor
const cursors = { users: ['users'] };

@context({ cursors })
export default class FeedFlowItem extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        item: FeedItemType
    };

    render() {
        const { users, item } = this.props;
        const owner = users[item.owner];
        const { scan, created, techs, summaryReport } = item;
        const date = moment(created).calendar();

        return <div className="feed-element">
            <a href="#" className="pull-left">
                {owner && <Avatar ref="avatar" avatar={owner.avatar}/>}
            </a>
            <div className="media-body">
                <small ref="date" className="pull-right text-navy">{date}</small>
                {this.renderAction(item, owner)}

                {scan && <TargetScan ref="scan" scan={scan}/>}
                {techs && this.renderTechs(techs)}
                {summaryReport && this.renderSummary(summaryReport)}
            </div>
        </div>;
    }

    renderAction(item, user) {
        if (item.type === 'scan') {
            const { scan } = item;
            const target = scan && scan.conf && scan.conf.target;
            return <span ref="action">
                <strong>{user.nickname}</strong>
                &nbsp;{iget('started scan')}&nbsp;
                <strong>{target}</strong>
            </span>;
        }

        return <span></span>;
    }

    renderTechs(techs) {
        return <div style={S.techs}>
            <h5>{iget('Founded technologies')}</h5>
            <div refCollection="techs" >
                {techs.map(t => <TechIcon
                    key={t.name + t.version}
                    tech={t}
                    style={S.tIcon}/>)}
            </div>
        </div>;
    }

    renderSummary(summary) {
        const { issues } = summary;
        return <div style={S.summary}>
            <h5>{iget('Founded issues')}</h5>
            <ul ref="summary" style={S.sList}>
                {[HIGH, MEDIUM, LOW, INFO]
                    .filter(s => issues[s])
                    .map(s => <li>{iget(s)} – {issues[s]}</li>)}
            </ul>
        </div>;
    }
}
