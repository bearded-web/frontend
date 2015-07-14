import { PropTypes, Component } from 'react';
import { Plan, User } from '../lib/types';
import { fromJS } from 'immutable';
import Plans from './plans';
import { context } from '../lib/nf';
import autobind from '../lib/autobind';
import { fetchPlans } from '../mutators/planMutators';

import { Row, Col, Well, Button } from 'react-bootstrap';

const cursors = { plans: ['plans'] };
const facets = { currentUser: 'currentUser' };

@context({ cursors, facets }, { fetchPlans })
export default class PlansPage extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    static propTypes = {
        currentUser: User,
        fetchPlans: PropTypes.func.isRequired,
        plans: PropTypes.arrayOf(Plan)
    };

    state = { search: '' };

    componentWillMount() {
        this.props.fetchPlans();
    }

    @autobind
    onSearchChange({ target: { value } }) {
        this.setState({
            search: value
        });
    }

    @autobind
    onCreateClick() {
        this.context.router.transitionTo('plan', {
            planId: 'new'
        });
    }

    render() {
        const { search } = this.state;
        const { plans, currentUser } = this.props;
        const imPlans = fromJS(plans);
        const isAdmin = currentUser && currentUser.admin;

        return <Row>
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
                <Col xs={12} md={8}>
                    <div className="pull-right">
                        {isAdmin && <Button
                            onClick={this.onCreateClick}
                            ref="create"
                            bsStyle="primary">
                            {iget('Create new plan')}
                        </Button>}
                    </div>
                </Col>
                <div className="clearfix"></div>
            </Row></Well></Col>
            <Col xs={12}>
                <Plans ref="plans" plans={imPlans} search={search}/>
            </Col>
        </Row>;
    }
}
