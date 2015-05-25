/**
 * TopPanel
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Link } from 'react-router';
import { Model } from '../lib/types';
import authStore from '../stores/auth.store';
import connectToStores from '../lib/connectToStores';

import ProfileNav from './profile-nav';
import NavProjectSelect from './NavProjectSelect';
import NavTargetSelect from './NavTargetSelect';

@connectToStores([authStore], () => ({ isAdmin: authStore.isAdmin() }))
export default class TopPanel extends Component {
    static propTypes = {
        isAdmin: PropTypes.bool,
        target: Model,
        project: Model
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { project, target, isAdmin } = this.props;

        return <div className="row border-bottom white-bg">
            <nav className="navbar navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse"
                            className="navbar-toggle collapsed" type="button">
                        <i className="fa fa-reorder"></i>
                    </button>
                    <Link to="overview" className="navbar-brand">
                        Bearded
                    </Link>
                </div>
                <div className="navbar-collapse collapse" id="navbar" aria-expanded="false" style2="height: 1px;">
                    <ul className="nav navbar-nav">
                        <NavProjectSelect project={project}/>
                        <NavTargetSelect project={project} target={target}/>
                    </ul>
                    <ul className="nav navbar-top-links navbar-right">
                        {isAdmin && this.renderAdminLink()}
                        <li>
                            <ProfileNav/>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>;
    }

    renderAdminLink() {
        return <li>
            <Link to="control-panel">
                {iget('Control panel')}
            </Link>
        </li>;

    }
}

