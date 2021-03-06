/**
 * Scan info
 * Contain progress
 */

import { PropTypes, Component } from 'react/addons';
import { contains } from 'lodash';
import flux from '../flux';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { create as createStyle } from 'react-style';

import Fa from './fa';
import { Link } from 'react-router';
import ScanSession from './scan-session';
import { Button } from 'react-bootstrap';

const S = createStyle({
    actions: { marginLeft: '1.9rem' }
});

export default class TargetScan extends Component {
    constructor() {
        super();

        bindAll(this, [
            'onRepeatClick'
        ]);

        this.updateInterval = 2000;

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region life cycle

    componentDidMount() {
        const isEnded = this._isEnded(this.props.scan);

        if (!isEnded) {

            this.intervalId = setInterval(() => {
                flux.actions.scan.fetchScans(this.props.scan);
            }, this.updateInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        const isEnded = this._isEnded(nextProps.scan);

        if (isEnded) {
            clearInterval(this.intervalId);
        }
    }

    //endregion life cycle

    //region handlers

    onRepeatClick(e) {
        e.preventDefault();

        const { scan } = this.props;

        flux.actions.scan.createScan(scan.target, scan.project, scan.plan.id || scan.plan);
    }

    //endregion handlers


    //region render
    render() {
        var { scan } = this.props,
            { sessions } = scan,
            isEnded = this._isEnded(scan) || '';

        return (
            <div>
                <h4>
                    {scan.plan && scan.plan.name}
                </h4>
                {sessions.map(function(session) {
                    return (
                        <ScanSession key={session.id} session={session}/>
                    );
                })}
                <div style={S.actions}>
                    {this.renderLink()}
                    {isEnded && this.renderRepeatBtn()}
                </div>
            </div>
        );
    }

    renderLink() {
        var { scan } = this.props,
            isEnded = this._isEnded(scan);

        if (this._isFailed(scan)) {
            return <span>
                <Fa icon="frown-o" fw size="lg"/>
                {iget('Scan failed')}
            </span>;
        }

        return <Link className="btn btn-outline btn-primary btn-xs"
                     to={isEnded ? 'report' : 'scan-report'} params={{ scanId: scan.id }}
                     query={{ target: scan.target, scan: scan.id }}>
            {isEnded ? iget('Show report') : iget('Show progress')}
        </Link>;
    }

    renderRepeatBtn() {
        const style = {
            marginLeft: '1rem'
        };

        return <a onClick={this.onRepeatClick}
                  style={style}
                  className="btn btn-outline btn-default btn-xs">
            {iget('Repeat scan')}
        </a>;
    }

    //endregion

    //region private

    _isEnded(scan) {
        return contains(['finished', 'failed'], scan.status);
    }

    _isFailed(scan) {
        return scan.status === 'failed';
    }

    //endregion private

}

TargetScan.propTypes = {
    scan: PropTypes.object.isRequired
};
TargetScan.contextTypes = {
    router: PropTypes.func
};
