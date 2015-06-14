/**
 * TargetTechsPage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fetchTechsPage } from '../mutators/techsMutators';
import { context } from '../lib/nf';
import { pick, values } from 'lodash';

import { Table } from 'react-bootstrap';

const cursors = { techs: ['techs'], pageData: ['targetTechsPage'] };

@context({ cursors }, { fetchTechsPage })
export default class TargetTechsPage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            targetId: PropTypes.string
        }),
        query: PropTypes.shape({
            page: PropTypes.string
        }),
        techs: PropTypes.object.isRequired,
        pageData: PropTypes.object.isRequired,
        fetchTechsPage: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentWillMount() {
        this.props.fetchTechsPage(this.props.params.targetId);
    }

    render() {
        const { pageData: { list }, techs } = this.props;
        const ts = values(pick(techs, list));

        return <Table>
            <tbody refCollection="techs">
                {ts.map(t => <tr><td>{t.id}</td></tr>)}
            </tbody>
        </Table>;
    }
}

