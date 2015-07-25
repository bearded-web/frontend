/**
 * ControlPanelPage
 */

import { PropTypes, Component } from 'react/addons';
import { RouteHandler } from 'react-router';
import purify from '../lib/purify';
import { startCase } from 'lodash';

import { Link } from 'react-router';

@purify
export default class ControlPanelPage extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    static propTypes = {
        params: PropTypes.object,
        query: PropTypes.object
    };

    render() {

        return <div>
            <br/>
            {this.renderBreadcrumps()}
            <br/>
            <RouteHandler {...this.props}/>
        </div>;
    }

    renderBreadcrumps() {
        const { params, query } = this.props;
        const routes = this.context.router
            .getCurrentRoutes()

            .map(r => r.name)
            .filter(n => n && n !== 'overview');

        return <ol className="breadcrumb">
            {routes.map(r => <li>
                <Link to={r} params={params} query={query}>{startCase(r)}</Link>
            </li>)}
        </ol>;
    }
}
