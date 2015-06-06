/**
 * TargetTechs
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf } from 'react-immutable-proptypes';
import connectToStores from '../lib/connectToStores';
import techsStore from '../stores/techsStore';
import { Model } from '../lib/types';
import { fetchForTarget } from '../actions/techsActions';

const getState = function(props) {
    return {
        techs: techsStore
            .getRawState()
            .toList()
            .filter(t => t.get('target') === props.target.get('id'))
    };
};

@connectToStores([techsStore], getState)
export default class TargetTechs extends Component {
    static propTypes = {
        target: Model,
        techs: listOf(Model)
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        fetchForTarget(this.props.target);
    }

    render() {
        const { techs } = this.props;

        return <ul>
            {techs.toArray().map(a => (<li>
                {a.get('name')}
            </li>))}
        </ul>;
    }
}

