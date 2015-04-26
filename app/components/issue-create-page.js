/**
 * IssueCreatePage
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import issueCreateStore from '../stores/issue-create.store';
import { bindAll } from 'lodash';
import { changeEditableIssue, saveEditableIssue } from '../actions/issues.actions';

import Header from './header';
import Ibox, { IboxContent } from './ibox';
import IssueCreateForm from './issue-create-form';

export default class IssueCreatePage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            '_getState',
            '_onStoreChanged'
        ]);

        this.state = this._getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        issueCreateStore.onChange(this._onStoreChanged);
    }

    componentWillUnmount() {
        issueCreateStore.offChange(this._onStoreChanged);
    }

    //region render
    render() {
        const { issue } = this.state;
        const title = iget('Create issue');

        return <div>
            <Header title={title}/>

            <Ibox><IboxContent>
                <IssueCreateForm issue={issue}
                                 onSubmit={saveEditableIssue}
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
IssueCreatePage.func = {
    router: PropTypes.object.isRequired
};
