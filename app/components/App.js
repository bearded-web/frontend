/**
 * App
 * root component of application
 * provide context for all components
 */
import Baobab from 'baobab';
import { PropTypes, Component } from 'react/addons';
import { RouteHandler } from 'react-router';

export default class App extends Component {
    static propTypes = {
        tree: PropTypes.instanceOf(Baobab),
        api: PropTypes.object.isRequired
    };
    static childContextTypes = {
        tree: PropTypes.instanceOf(Baobab),
        api: PropTypes.object.isRequired
    };

    // Handling child context
    getChildContext() {
        return {
            tree: this.props.tree,
            api: this.props.api
        };
    }

    render() {
        return <RouteHandler {...this.props}/>;
    }
}

