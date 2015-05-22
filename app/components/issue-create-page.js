/**
 * IssueCreatePage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import issueCreateStore from '../stores/issue-create.store';
import { bindAll } from 'lodash';
import { changeEditableIssue, saveEditableIssue } from '../actions/issuesActions';
import setTitle from '../lib/set-title';

import Header from './header';
import Ibox, { IboxContent } from './ibox';
import IssueCreateForm from './issue-create-form';

export default class IssueCreatePage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSave',
            '_getState',
            '_onStoreChanged'
        ]);

        this.state = this._getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        setTitle(iget('Create issue'));

        issueCreateStore.onChange(this._onStoreChanged);
    }

    componentWillUnmount() {
        issueCreateStore.offChange(this._onStoreChanged);
    }

    onSave() {
        const { issue } = this._getState();
        const target = this.context.router.getCurrentQuery().target;

        saveEditableIssue({ target });
    }

    //region render
    render() {
        const { issue, loading, error } = this.state;
        const title = iget('Create issue');

        return <div>
            <Header title={title}/>

            <Ibox><IboxContent>
                <IssueCreateForm issue={issue}
                                 loading={loading}
                                 error={error}
                                 onSubmit={this.onSave}
                                 onChange={changeEditableIssue}/>
            </IboxContent></Ibox>
        </div>;
    }
    //endregion

    _onStoreChanged() {
        this.setState(this._getState());
    }

    _getState() {
        return issueCreateStore.getState();
    }
}

IssueCreatePage.propTypes = {};
IssueCreatePage.contextTypes = {
    router: PropTypes.func.isRequired
};
