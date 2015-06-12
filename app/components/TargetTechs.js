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
import { create as createStyle } from 'react-style';
import { lazurColor } from '../style';

import TechIcon from './TechIcon';

const S = createStyle({
    ul: {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    tech: {
        display: 'block',
        width: 100,
        float: 'left',
        padding: '4px 8px',
        textAlign: 'center',
        marginBottom: '10px'
    }
});

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

        return <ul style={S.ul}>
            {techs.toArray().map(this.renderTech)}
        </ul>;
    }

    renderTech(tech) {
        const name = tech.get('name');
        const id = tech.get('id');
        return <li key={id} style={S.tech}>
            <TechIcon tech={tech}/>
            <br/>
            {name}
        </li>;
    }
}

