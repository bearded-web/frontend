/**
 * TargetTechsPage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fetchTechs } from '../mutators/techsMutators';
import { context } from '../lib/nf';
import { values, isUndefined } from 'lodash';
import { INCORRECT } from '../lib/techStatus';
import { create as createStyle } from 'react-style';

import { Row, Col } from 'react-bootstrap';
import Tech from './Tech';
import { Link } from 'react-router';

const S = createStyle({
    controls: { margin: '1rem 0' },
    tech: { padding: '1rem', margin: '1.5rem 0', backgroundColor: 'white' }
});
const cursors = { techs: ['techs'] };

@context({ cursors }, { fetchTechs })
export default class TargetTechsPage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            targetId: PropTypes.string
        }),
        query: PropTypes.shape({
            showIncorrect: PropTypes.bool
        }),
        techs: PropTypes.object.isRequired,
        fetchTechs: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentWillMount() {
        this.fetch(this.props.params.targetId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.targetId !== nextProps.params.targetId) {
            this.fetch(nextProps.params.targetId);
        }
    }

    render() {
        const {
            techs,
            params,
            query } = this.props;
        const { targetId } = params;
        let showIncorrect = !isUndefined(query.showIncorrect);

        const statusFilter = t => showIncorrect ?
            t.status === INCORRECT :
            t.status !== INCORRECT;

        const ts = values(techs)
            .filter(t => (t.target === targetId) && statusFilter(t))
            .sort((a, b) => a.status < b.status);

        return <Row><Col xs={12} md={8} mdOffset={2}>
            <div className="text-right" style={S.controls}>
                {this.renderLink(showIncorrect)}
            </div>
            <div refCollection="techs">
                {ts.map(this.renderTech)}
            </div>
        </Col></Row>;
    }

    renderTech(tech) {
        return <Tech tech={tech} key={tech.id} style={S.tech}/>;
    }

    renderLink(showIncorrect) {
        const text = showIncorrect ?
            iget('Show correct and unknown') :
            iget('Show incorrect');
        const ref = showIncorrect ? 'showCorrect' : 'showIncorrect';
        const query = showIncorrect ? {} : { showIncorrect: '' };
        const bs = showIncorrect ? 'success' : 'warning';
        return <Link
            ref={ref}
            to="target-techs"
            params={this.props.params}
            query={query}
            className={`btn btn-${bs}`}>
            {text}
        </Link>;
    }

    fetch(target) {
        this.props.fetchTechs({ target });
    }
}
