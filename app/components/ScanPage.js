/**
 * ScanPage
 */

import { PropTypes, Component } from 'react/addons';
import { context } from '../lib/nf';
import { fetchScan } from '../mutators/scanMutators';
import { fetchPlans } from '../mutators/planMutators';
import { create as createStyle } from 'react-style';

import { Row, Col } from 'react-bootstrap';
import TargetScan from './target-scan';
import Ibox, { IboxContent } from './ibox';

const S = createStyle({
    page: { marginTop: '2rem' }
});
const cursors = { scans: ['scans'], plans: ['plans'] };


@context({ cursors }, { fetchPlans, fetchScan })
export default class ScanPage extends Component {
    static propTypes = {
        scans: PropTypes.object.isRequired,
        plans: PropTypes.object.isRequired,
        params: PropTypes.shape({
            scan: PropTypes.string.isRequired
        }).isRequired,
        fetchScan: PropTypes.func.isRequired,
        fetchPlans: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchScan(this.props.params.scanId);
        //TODO fetch only scan.plan plan
        this.props.fetchPlans();
    }

    render() {
        const { scans, plans, params: { scanId } } = this.props;
        const scan = scans[scanId];
        const plan = scan && plans[scans[scanId].plan];
        const title = plan && plan.desc;

        return <Row style={S.page}>
            <Col xs={12} md={8} mdOffset={2}>
                <Ibox><IboxContent>
                    <h2 ref="title">{title}</h2>
                    <br/>
                    {scan && <TargetScan ref="scan" scan={scan}/>}
                </IboxContent></Ibox>
            </Col>
        </Row>;
    }
}
