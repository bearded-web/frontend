/**
 * ControlPanelPage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import { Link } from 'react-router';

export default class ControlPanelPage extends Component {
    static propTypes = {};
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        return <div>
            <ul className="nav nav-pills">
                <li role="presentation">
                    <Link to="agents">
                        {iget('Agents')}
                    </Link>
                </li>
                <li role="presentation">
                    <Link to="plans">
                        {iget('Plans')}
                    </Link>
                </li>
            </ul>
        </div>;
    }
}

