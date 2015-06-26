/**
 * TopPanel
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Link } from 'react-router';
import { Model } from '../lib/types';
import authStore from '../stores/auth.store';
import connectToStores from '../lib/connectToStores';
import cName from 'classnames';

import ProfileNav from './profile-nav';
import NavProjectSelect from './NavProjectSelect';
import NavTargetSelect from './NavTargetSelect';
import TargetLabel from './TargetLabel';

@connectToStores([authStore], () => ({ isAdmin: authStore.isAdmin() }))
export default class TopPanel extends Component {
    static propTypes = {
        isAdmin: PropTypes.bool,
        target: PropTypes.object,
        project: Model
    };

    state = { expanded: false };
    shouldComponentUpdate = shouldComponentUpdate;

    onBurgerClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { project, target, isAdmin } = this.props;
        const nBarClasses = cName('navbar-collapse', 'collapse', { in: this.state.expanded });
        const targetLink = target ?
            <Link
                to="target"
                params={{targetId: target.id}}
                style={{paddingRight: 0}}>
                <TargetLabel target={target}/>
            </Link> :
            '';
        return <div className="row border-bottom white-bg">
            <nav className="navbar navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <button
                        onClick={() => this.onBurgerClick()}
                        className="navbar-toggle collapsed"
                        type="button">
                        <i className="fa fa-reorder"></i>
                    </button>
                    <Link to="overview" className="navbar-brand">
                        Bearded
                    </Link>
                </div>
                <div className={nBarClasses}>
                    <ul className="nav navbar-nav">
                        <li><Link to="overview" style={{paddingRight: 0}}>{project.get('name')}</Link></li>
                        <NavProjectSelect project={project}/>
                        <li>{targetLink}</li>
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
