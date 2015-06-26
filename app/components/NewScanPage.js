/**
 * NewScanPage
 */

import { PropTypes, Component } from 'react/addons';
import setTitle from '../lib/set-title';
import { fetchPlans } from '../mutators/planMutators';
import { createScan } from '../mutators/scanMutators';
import { context } from '../lib/nf';
import { fromJS } from 'immutable';
import autobind from '../lib/autobind';

import Plans from './plans';
import { Row, Col, Well } from 'react-bootstrap';

const cursors = { plans: ['plans'] };

@context({ cursors }, { fetchPlans, createScan })
export default class NewScanPage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            targetId: PropTypes.string.isRequired
        }).isRequired,
        query: PropTypes.shape({
            project: PropTypes.string.isRequired
        }).isRequired,
        plans: PropTypes.object,
        fetchPlans: PropTypes.func.isRequired,
        createScan: PropTypes.func.isRequired
    };

    state = { search: '' };

    componentDidMount() {
        setTitle(iget('New scan'));
        this.props.fetchPlans();
    }

    @autobind
    onSearchChange({ target: { value } }) {
        this.setState({
            search: value
        });
    }

    @autobind
    onStartScan(imPlan) {
        this.props.createScan(
            this.props.params.targetId,
            this.props.query.project,
            imPlan.get('id')
        );
    }

    render() {
        const { search } = this.state;
        const plans = fromJS(this.props.plans);

        return <Row>
            <br/>
            <Col xs={12}><Well bsSize="small"><Row>
                <Col xs={12} md={4}>
                    <input
                        value={search}
                        onChange={this.onSearchChange}
                        ref="search"
                        className="form-control"
                        placeholder={iget('Search plan...')}
                        type="text"/>
                </Col>
                <div className="clearfix"></div>
            </Row></Well></Col>
            <Col xs={12}>
                <Plans ref="plans"
                    plans={plans}
                    onStartScan={this.onStartScan}
                    search={search}/>
            </Col>
        </Row>;
    }
}
