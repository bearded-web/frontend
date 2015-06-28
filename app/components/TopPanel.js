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
import { create as createStyle } from 'react-style';
import { context } from '../lib/nf';

import ProfileNav from './profile-nav';
import NavProjectSelect from './NavProjectSelect';
import NavTargetSelect from './NavTargetSelect';

const S = createStyle({
    navBtn: { marginLeft: '1rem' }
});
const facets = { project: 'currentProject' };

@connectToStores([authStore], () => ({ isAdmin: authStore.isAdmin() }))
@context({ facets })
export default class TopPanel extends Component {
    static propTypes = {
        isAdmin: PropTypes.bool,
        targetId: PropTypes.string,
        project: Model
    };

    state = { expanded: false };
    shouldComponentUpdate = shouldComponentUpdate;

    onBurgerClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { project, targetId, isAdmin } = this.props;
        const nBarClasses = cName('navbar-collapse', 'collapse', { in: this.state.expanded });

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
                        <span style={S.navBtn}>
                            <NavProjectSelect project={project}/>
                        </span>
                        <span style={S.navBtn}>
                            <NavTargetSelect project={project} targetId={targetId}/>
                        </span>
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
