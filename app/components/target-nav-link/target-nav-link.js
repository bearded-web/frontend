'use strict';
import { Map } from 'immutable';
import { WEB, ANDROID } from '../../lib/target-types';
import React, { PropTypes } from 'react/addons';
import actions from '../../actions/app.actions';
import _ from 'lodash';

import { Link } from 'react-router';
import { Label } from 'react-bootstrap';
import Fa from '../fa';

module.exports = React.createClass({
    propTypes: {
        target: PropTypes.instanceOf(Map).isRequired
    },

    contextTypes: {
        router: PropTypes.func
    },

    onClick: function() {
        actions.toggleLeftPanel();
    },

    render: function() {
        var target = this.props.target.toJS(),
            targetId = target.id,
            isActiveLink = this.isActiveState(),
            isHttps = false;

        const icon = target.type === ANDROID ?
            'android' :
            isHttps ? 'lock' : 'globe';

        let title = target.type === ANDROID ?
            target.android.name :
            target.web.domain;

        if (_.startsWith(title, 'http://')) {
            title = title.slice(7);
        }

        if (_.startsWith(title, 'https://')) {
            title = title.slice(8);
            isHttps = true;
        }

        return (
            <li className={isActiveLink ? 'active' : ''}>
                <Link onClick={this.onClick} to="target" params={{ targetId: targetId }} title={title}>
                    {this.renderIssuesLabel()}
                    <span className="nav-label">
                        <Fa icon={icon}/>
                        {title}
                    </span>
                </Link>
            </li>
        );
    },


    renderIssuesLabel: function() {
        var { issues } = this.props.target.toJS().summaryReport || { issues: {} },
            count = 0,
            labelStyle;

        if (issues.low) {
            count = issues.low;
            labelStyle = 'info';
        }

        if (issues.medium) {
            count = issues.medium;
            labelStyle = 'warning';
        }

        if (issues.high) {
            count = issues.high;
            labelStyle = 'danger';
        }

        if (!count) return '';

        const style = {
            float: 'right',
            marginLeft: '0.3rem'
        };

        return <Label bsStyle={labelStyle} style={style}>{count}</Label>;
    },

    isActiveState() {
        const { router } = this.context;

        var targetId = this.props.target.toJS().id;

        return router.isActive('target', { targetId }) ||
            router.getCurrentQuery().target === targetId;
    }
});
