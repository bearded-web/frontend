/**
 * IssuesSummaryFilter
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import autobind from '../lib/autobind';
import { updateFilter } from '../actions/issuesActions';

import { Input, Button } from 'react-bootstrap';
import Fa from './fa';


export default class IssuesSummaryFilter extends Component {
    static propTypes = {
        filter: shape({ summary: PropTypes.string }).isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onSubmit(e) {
        e.preventDefault();
        const search = this.refs.search.getValue();
        nextTick(() => updateFilter(this.props.filter.set('search', search)));
    }

    render() {
        const search = this.props.filter.get('search');
        const button = <Button
            type="submit"
            bsSize="small"
            bsStyle="primary">
            <Fa icon="search"/>
        </Button>;

        return <form onSubmit={this.onSubmit}>
            <Input
                type="text"
                ref="search"
                defaultValue={search}
                placeholder={iget('Summary search')}
                className="input-sm"
                buttonAfter={button}/>
        </form>;
    }
}

