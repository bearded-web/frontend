/**
 * TargetTechs
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Target } from '../lib/types';
import { fetchTechs } from '../mutators/techsMutators';
import { create as createStyle } from 'react-style';
import { context } from '../lib/nf';
import { values, groupBy } from 'lodash';
import { UNKNOWN, CORRECT } from '../lib/techStatus';

import Tech from './Tech';
import TechIcon from './TechIcon';

const S = createStyle({
    ul: {
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    icon: {
        display: 'block',
        float: 'left',
        padding: '4px 8px',
        textAlign: 'center',
        marginBottom: '10px'
    },
    tech: {
        borderTop: '1px solid #eee',
        padding: '1rem 0'
    }
});
const cursors = { techs: ['techs'] };

@context({ cursors }, { fetchTechs })
export default class TargetTechs extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    static propTypes = {
        target: Target,
        fetchTechs: PropTypes.func.isRequired,
        techs: PropTypes.object.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        this.fetch(this.props.target.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.target.id !== nextProps.target.id) {
            this.fetch(nextProps.target.id);
        }
    }

    onTechsClick = () => {
        this.context.router.transitionTo('target-techs', { targetId: this.props.target.id });
    }

    render() {
        const { target } = this.props;
        const techs = groupBy(
            values(this.props.techs).filter(t => t.target === target.id),
            t => t.status);

        return <div>
            <ul style={S.ul} onClick={this.onTechsClick} className="clearfix">
                {techs[CORRECT] && techs[CORRECT].map(this.renderTech)}
            </ul>
            {techs[UNKNOWN] && techs[UNKNOWN].map(t => <Tech tech={t} key={t.id} style={S.tech}/>)}
        </div>;
    }

    renderTech(tech) {
        const { id } = tech;

        return <li key={id} style={S.icon}>
            <TechIcon tech={tech}/>
        </li>;
    }

    fetch(target) {
        this.props.fetchTechs({ target });
    }
}
